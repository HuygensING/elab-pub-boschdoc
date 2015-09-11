import React from "react";
import {Tabs, Tab} from "hire-tabs";
import TextLayer from "hire-textlayer";
import Metadata from "./metadata";
import SourceInfo from "./source-info";
import Paginator from "./paginator";
import actions from "../actions/document";
import documentStore from "../stores/document";
import pagesStore from "../stores/pages";
import languageKeys from "../stores/i18n-keys";
import appRouter from "../router";


class DocumentController extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			fixContent: false, 
			prevPage: null,
			nextPage: null
		};
		this.scrollListener = this.handleScroll.bind(this);
		this.storeChangeListener = this.onPageStoreChange.bind(this);
		this.initialAnnotationId = this.props.annotationId;
	}

	componentDidMount() {
		this.onPageStoreChange();
		pagesStore.listen(this.storeChangeListener);
		window.addEventListener('scroll', this.scrollListener);

	}

	componentWillReceiveProps(nextProps) {
		this.onPageStoreChange(nextProps);
	}


	componentDidUpdate() {
		if(this.initialAnnotationId) {
			this.onAnnotationClick(document.getElementById(this.props.annotationId));
			this.initialAnnotationId = null;
		}
	}

	componentWillUnmount() {
		pagesStore.stopListening(this.storeChangeListener);
		window.removeEventListener('scroll', this.scrollListener);
	}

	onPageStoreChange(nextProps) {
		let props = nextProps || this.props;
		let pageState = pagesStore.getState();
		let ids = pageState.ids || [];
		let pageIndex = ids.indexOf(parseInt(props.id));
		if(pageIndex === ids.length - 1 && pageState.next) {
			actions.getNextResultPage(pageState.next);
		}
		
		console.log("CURRENT PAGE INDEX", pageIndex);

		this.setState({
			nextPage: pageIndex > -1 ? ids[pageIndex + 1] || null : null,
			prevPage: pageIndex > -1 ? ids[pageIndex - 1] || null : null
		});
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
				appRouter.navigate(this.props.language + "/entry/" + this.props.id + "/translation");
				break;
			case 2:
				appRouter.navigate(this.props.language + "/entry/" + this.props.id + "/remarks");
				break;
			case 3:
				appRouter.navigate(this.props.language + "/entry/" + this.props.id + "/metadata");
				break;
			case 0:
			default:
				appRouter.navigate(this.props.language + "/entry/" + this.props.id + "/transcription");
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
		appRouter.navigate(this.props.language + "/entry/" + this.props.id + "/" + this.props.activeTab + "/" + annotatedText.getAttribute("id"), {replace: true});
	}

	renderTextLayer(key, lang) {
		let keys = languageKeys[lang];
		return this.props.data.paralleltexts[keys[key]] ? (
			<TextLayer 
				data={this.props.data.paralleltexts[keys[key]]}
				label="" 
				onAnnotationClick={this.onAnnotationClick.bind(this)}
				onNavigation={this.navigateToEntry.bind(this)} 
				relatedAnnotationLabel={this.state.relatedAnnotationLabel} />
		) : null;
	}

	navigateToEntry(id) {
		appRouter.navigateToResult({id: id})
	}

	onSearchClick() {
		appRouter.navigate("/" + this.props.language + "/search");
	}

	onNextClick() {
		appRouter.navigateToResult({id: this.state.nextPage});
	}

	onPrevClick() {
		appRouter.navigateToResult({id: this.state.prevPage});
	}

	renderTabs(lang) {
		let keys = languageKeys[lang];
		return (
			<Tabs onChange={this.handleTabChange.bind(this)}>
				<Tab active={this.props.activeTab === "transcription"} label={keys["transcription"]}>
					{this.renderTextLayer("transcription", lang)}
				</Tab>
				<Tab active={this.props.activeTab === "translation"} label={keys["translation"]}>
					{this.renderTextLayer("translation", lang)}
				</Tab>
				<Tab active={this.props.activeTab === "remarks"} label={keys["remarks"]}>
					{this.renderTextLayer("remarks", lang)}
				</Tab>
				<Tab active={this.props.activeTab === "metadata"} label={keys["metadata"]}>
					<Metadata language={lang} metadata={this.props.data.metadata}  />
				</Tab>
			</Tabs>
		);
	}

	render() {
		let facs = this.props.data.facsimiles.length > 0 ?
			(<iframe key={this.props.data.facsimiles[0].title} src={this.props.data.facsimiles[0].zoom}></iframe>) :
			"no facsimile";

		return (
			<article className={"entry" + (this.state.fixContent ? " fixed-content" : "")}>
				<Paginator 
					labels={languageKeys[this.props.language].pagination}
					onNextClick={this.state.nextPage ? this.onNextClick.bind(this) : null} 
					onPrevClick={this.state.prevPage ? this.onPrevClick.bind(this) : null} 
					onSearchClick={this.onSearchClick.bind(this)} 
					/>
				<h2>{this.props.data.name}</h2>
				<SourceInfo metadata={this.props.data.metadata}  />

				<div className="facsimile">
					{facs}
				</div>
				<div className="text" style={{display: this.props.language === "nl" ? "block" : "none"}}>
					{this.renderTabs("nl")}
				</div>
				<div className="text" style={{display: this.props.language === "en" ? "block" : "none"}}>
					{this.renderTabs("en")}
				</div>
				<div className="text" style={{display: this.props.language === "es" ? "block" : "none"}}>
					{this.renderTabs("es")}
				</div>
			</article>
		);
	}
}


DocumentController.propTypes = {
	activeTab: React.PropTypes.string,
	annotationId: React.PropTypes.string,
	data: React.PropTypes.object,
	id: React.PropTypes.string,
	language: React.PropTypes.string
};

DocumentController.defaultProps = {
	activeTab: "transcription",
	language: "nl"
}

export default DocumentController;