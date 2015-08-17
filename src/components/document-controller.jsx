import React from "react";
import TextLayer from "hire-textlayer";
import actions from "../actions/document";
import documentStore from "../stores/document";
import i18nStore from "../stores/i18n";
import appRouter from "../router";

class DocumentController extends React.Component {

	constructor(props) {
		super(props);
		this.state = {id: null, i18n: i18nStore.getState(), fixContent: false};
		this.scrollListener = this.handleScroll.bind(this);
		this.storeChangeListener = this.onStoreChange.bind(this);
	}

	componentDidMount() {
		documentStore.listen(this.storeChangeListener);
		i18nStore.listen(this.storeChangeListener);
		actions.getDocument(this.props.id);
		window.addEventListener('scroll', this.scrollListener);
	}

	componentWillReceiveProps(newProps) {
		actions.getDocument(newProps.id);
	}

	componentWillUnmount() {
		documentStore.stopListening(this.storeChangeListener);
		i18nStore.stopListening(this.storeChangeListener);
		window.removeEventListener('scroll', this.scrollListener);
	}

	onStoreChange() {
		let state = documentStore.getState(), keys = i18nStore.getState().keys;

		this.setState({
			id: state.id,
			i18n: i18nStore.getState(),
			name: state.name,
			facsimiles: state.facsimiles,
			transcription: state.paralleltexts[keys.transcription],
			remarks: state.paralleltexts[keys.remarks],
			translation: state.paralleltexts[keys.translation],
			relatedAnnotationLabel: keys.relatedAnnotationLabel
		});
	}
	

	navigateToEntry(id) {
		appRouter.navigateToResult({id: id})
	}

	handleScroll(ev) {
		if(window.pageYOffset > document.getElementsByTagName("header")[0].offsetHeight) {
			if(!this.state.fixContent) { this.setState({fixContent: true}); }
		} else {
			if(this.state.fixContent) { this.setState({fixContent: false}); }
		}
	}

	renderTextLayer(key) {
		let keys = this.state.i18n.keys;
		return this.state[key] ?
			<TextLayer 
				data={this.state[key]}
				label={keys[key]} 
				onNavigation={this.navigateToEntry.bind(this)} 
				relatedAnnotationLabel={this.state.relatedAnnotationLabel} /> :
			null;
	}

	render() {
		if(this.state.id === null) {
			return (<div />)
		} else {
			let facs = this.state.facsimiles.length > 0 ?
				(<iframe key={this.state.facsimiles[0].title} src={this.state.facsimiles[0].zoom}></iframe>) :
			"no facsimile";

			return (
				<article className={"entry" + (this.state.fixContent ? " fixed-content" : "")}>
					<h2>{this.state.name}</h2>
					<div className="facsimile">
						{facs}
					</div>
					<div className="text">
						{this.renderTextLayer("transcription")}
						{this.renderTextLayer("translation")}
						{this.renderTextLayer("remarks")}
					</div>
				</article>
			)
		}
	}
}


DocumentController.propTypes = {
	id: React.PropTypes.string
};

export  default DocumentController;