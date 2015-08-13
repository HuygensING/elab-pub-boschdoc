import React from "react";
import TextLayer from "hire-textlayer";
import actions from "../actions/document";
import documentStore from "../stores/document";
import i18nStore from "../stores/i18n";
import appRouter from "../router";

class DocumentController extends React.Component {

	constructor(props) {
		super(props);
		this.state = {id: null, i18n: i18nStore.getState()};
	}

	componentDidMount() {
		documentStore.listen(this.onStoreChange.bind(this));
		i18nStore.listen(this.onStoreChange.bind(this));
		actions.getDocument(this.props.id);
	}

	componentWillReceiveProps(newProps) {
		actions.getDocument(newProps.id);
	}

	componentWillUnmount() {
		documentStore.stopListening(this.onStoreChange.bind(this));
		i18nStore.stopListening(this.onStoreChange.bind(this));
	}

	onStoreChange() {
		let state = documentStore.getState(), keys = i18nStore.getState().keys;

		this.setState({
			id: state.id,
			i18n: i18nStore.getState(),
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
				(<iframe className="facsimile" key={this.state.facsimiles[0].title} src={this.state.facsimiles[0].zoom}></iframe>) :
			"no facsimile";

			return (
				<div>
					<div className="left-pane">
						{facs}
					</div>
					<div className="right-pane">
						<h1>{this.state.name}</h1>
						{this.renderTextLayer("transcription")}
						{this.renderTextLayer("remarks")}
						{this.renderTextLayer("translation")}
					</div>
				</div>
			)
		}
	}
}


DocumentController.propTypes = {
	id: React.PropTypes.string
};

export  default DocumentController;