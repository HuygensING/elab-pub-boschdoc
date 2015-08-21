import React from "react";
import {Tabs, Tab} from "hire-tabs";
import TextLayer from "hire-textlayer";
import Metadata from "./metadata";
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
		this.initialAnnotationId = this.props.annotationId;
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

		if(newProps.activeTab !== this.state.activeTab) {
			this.setState({activeTab: newProps.activeTab});
		}
	}

	componentDidUpdate() {
		if(this.initialAnnotationId) {
			this.onAnnotationClick(document.getElementById(this.props.annotationId));
			this.initialAnnotationId = null;
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
			paralleltexts: state.paralleltexts,
			metadata: state.metadata
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
				appRouter.navigate(this.state.language + "/entry/" + this.state.id + "/translation");
				this.setState({activeTab: "translation"});
				break;
			case 2:
				appRouter.navigate(this.state.language + "/entry/" + this.state.id + "/remarks");
				this.setState({activeTab: "remarks"});
				break;
			case 3:
				appRouter.navigate(this.state.language + "/entry/" + this.state.id + "/metadata");
				this.setState({activeTab: "metadata"});
				break;
			case 0:
			default:
				appRouter.navigate(this.state.language + "/entry/" + this.state.id + "/transcription");
				this.setState({activeTab: "transcription"});
		}
	}

	onAnnotationClick(annotatedText) {
		if(this.state.fixContent) {
			window.scrollTo(0, window.scrollY + annotatedText.getBoundingClientRect().top - 106);
		} else {
			window.scrollTo(0, document.getElementsByTagName("header")[0].offsetHeight + 1);
			window.setTimeout(function() {
				window.scrollTo(0, window.scrollY + annotatedText.getBoundingClientRect().top - 106);
			}, 50);
		}
		appRouter.navigate(this.state.language + "/entry/" + this.state.id + "/" + this.state.activeTab + "/" + annotatedText.getAttribute("id"), {replace: true});
	}

	renderTextLayer(key, lang) {
		let keys = languageKeys[lang];
		return this.state.paralleltexts[keys[key]] ? (
			<TextLayer 
				data={this.state.paralleltexts[keys[key]]}
				label="" 
				onAnnotationClick={this.onAnnotationClick.bind(this)}
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
					<Tab active={this.state.activeTab === "metadata"} label={keys["metadata"]}>
						<Metadata language={lang} metadata={this.state.metadata}  />
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
	annotationId: React.PropTypes.string,
	id: React.PropTypes.string,
	language: React.PropTypes.string
};

DocumentController.defaultProps = {
	activeTab: "transcription"
}

export  default DocumentController;