import React from "react";
import {Tabs, Tab} from "hire-tabs";
import TextLayer from "hire-textlayer";
import actions from "../actions/document";
import documentStore from "../stores/document";
import appRouter from "../router";

class DocumentController extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: null, 
			fixContent: false, 
			activeTab: this.props.activeTab,
			i18n: this.props.i18n
		};
		this.scrollListener = this.handleScroll.bind(this);
		this.storeChangeListener = this.onStoreChange.bind(this);
	}

	componentDidMount() {
		documentStore.listen(this.storeChangeListener);
		window.addEventListener('scroll', this.scrollListener);
		if(this.props.id) {
			actions.getDocument(this.props.id);
		}

	}

	componentWillReceiveProps(newProps) {
		if(newProps.id && newProps.id !== this.props.id) {
			actions.getDocument(newProps.id);
		}
		if(newProps.i18n !== this.state.i18n) {
			this.setState({i18n: newProps.i18n}, this.onStoreChange.bind(this));
		}
	}

	componentWillUnmount() {
		documentStore.stopListening(this.storeChangeListener);
		window.removeEventListener('scroll', this.scrollListener);
	}

	onStoreChange() {
		let state = documentStore.getState();
		let keys = this.state.i18n;

		this.setState({
			id: state.id,
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

	handleTabChange(label, index) {
		window.scrollTo(0, 0);
		switch(index) {
			case 1:
				this.setState({activeTab: "translation"});
				break;
			case 2:
				this.setState({activeTab: "remarks"});
				break;
			case 0:
			default:
				this.setState({activeTab: "transcription"});
		}
	}

	renderTextLayer(key) {
		let keys = this.state.i18n;
		return this.state[key] ?
			<TextLayer 
				data={this.state[key]}
				label="" 
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
			let keys = this.state.i18n;

			return (
				<article className={"entry" + (this.state.fixContent ? " fixed-content" : "")}>
					<h2>{this.state.name}</h2>
					<div className="facsimile">
						{facs}
					</div>
					<div className="text">
						<Tabs onChange={this.handleTabChange.bind(this)}>
							<Tab active={this.state.activeTab === "transcription"} label={keys["transcription"]}>
								{this.renderTextLayer("transcription")}
							</Tab>
							<Tab active={this.state.activeTab === "translation"} label={keys["translation"]}>
								{this.renderTextLayer("translation")}
							</Tab>
							<Tab active={this.state.activeTab === "remarks"} label={keys["remarks"]}>
								{this.renderTextLayer("remarks")}
							</Tab>
						</Tabs>			
					</div>
				</article>
			)
		}
	}
}


DocumentController.propTypes = {
	activeTab: React.PropTypes.string,
	i18n: React.PropTypes.object,
	id: React.PropTypes.string
};

DocumentController.defaultProps = {
	activeTab: "transcription"
}

export  default DocumentController;