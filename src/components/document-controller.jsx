import React from "react";
import {Tabs, Tab} from "hire-tabs";
import TextLayer from "hire-textlayer";
import actions from "../actions/document";
import documentStore from "../stores/document";
import languageKeys from "../stores/i18n-keys";
import appRouter from "../router";


class DocumentController extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: null, 
			fixContent: false, 
			activeTab: this.props.activeTab,
			language: this.props.language
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
		if(newProps.language !== this.state.language) {
			this.setState({language: newProps.language});
		}
	}

	componentWillUnmount() {
		documentStore.stopListening(this.storeChangeListener);
		window.removeEventListener('scroll', this.scrollListener);
	}

	onStoreChange() {
		let state = documentStore.getState();
		let keys = languageKeys;

		this.setState({
			id: state.id,
			name: state.name,
			facsimiles: state.facsimiles,
			paralleltexts: state.paralleltexts
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

	renderTextLayer(key, lang) {
		let keys = languageKeys[lang];
		return this.state.paralleltexts[keys[key]] ? (
			<TextLayer 
				data={this.state.paralleltexts[keys[key]]}
				label="" 
				onNavigation={this.navigateToEntry.bind(this)} 
				relatedAnnotationLabel={this.state.relatedAnnotationLabel} />
		) : null;
	}

	renderTabs(lang) {
		let keys = languageKeys[lang];

		return (
				<Tabs onChange={this.handleTabChange.bind(this)}>
					<Tab active={this.state.activeTab === "transcription"} label={keys["transcription"]}>
						{this.renderTextLayer("transcription", lang)}
					</Tab>
					<Tab active={this.state.activeTab === "translation"} label={keys["translation"]}>
						{this.renderTextLayer("translation", lang)}
					</Tab>
					<Tab active={this.state.activeTab === "remarks"} label={keys["remarks"]}>
						{this.renderTextLayer("remarks", lang)}
					</Tab>
				</Tabs>			
		);
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
					<div className="text" style={{display: this.state.language === "nl" ? "block" : "none"}}>
						{this.renderTabs("nl")}
					</div>
					<div className="text" style={{display: this.state.language === "en" ? "block" : "none"}}>
						{this.renderTabs("en")}
					</div>
					<div className="text" style={{display: this.state.language === "es" ? "block" : "none"}}>
						{this.renderTabs("es")}
					</div>
				</article>
			)
		}
	}
}


DocumentController.propTypes = {
	activeTab: React.PropTypes.string,
	id: React.PropTypes.string,
	language: React.PropTypes.string
};

DocumentController.defaultProps = {
	activeTab: "transcription"
}

export  default DocumentController;