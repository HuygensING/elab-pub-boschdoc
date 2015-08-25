import React from "react";
import appRouter from "./router";
import appStore from "./stores/app";
import viewActions from "./actions/view";
import languageKeys from "./stores/i18n-keys";
import LanguageFilter from "./stores/i18n-filter";
import FacetedSearch from "hire-faceted-search";
import Document from "./components/document-controller";
import api from "./api";


class AppController extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			language: this.props.language || appStore.getLanguage(),
			controller: this.props.controller || "search",
			id: this.props.id || null,
			activeTab: this.props.activeTab
		};
		this.changeListener = this.onStoreChange.bind(this);
		this.cachedViews = {
			search: {}
		};
		this.searchTerm = null;
	}

	componentDidMount() {
		appStore.listen(this.changeListener);
	}

	componentWillUnmount() {
		appStore.stopListen(this.changeListener);
	}

	onStoreChange() {
		this.setState(appStore.getState());
	}

	navigateHome(ev) {
		appRouter.navigate("/" + this.state.language + "/search");
	}

	navigateLanguage(ev) {
		if( appRouter.history.fragment === "") {
			appRouter.navigate(ev.target.getAttribute("data-lang"));
		} else {
			let path = appRouter.history.fragment.replace(/^[a-z]{2}/, ev.target.getAttribute('data-lang'));
			appRouter.navigate(path);
		}
	}

	navigateToResult(obj) {
		window.scrollTo(0, 0);
		appRouter.navigateToResult({id: obj.id});
	}

	onResultsChange(data) {
		let ids = data.results.map((r) => { return r.id});
		let prev = data._prev ? data._prev.replace("draft//api", "draft/api") : null;
		let next = data._next ? data._next.replace("draft//api", "draft/api") : null;
		viewActions.setPages(ids, prev, next, 0);
	}

	renderFacetedSearch(lang) {
		if(this.cachedViews.search[lang]) { return this.cachedViews.search[lang]; }

		let facetList = new LanguageFilter(lang, Object.keys(languageKeys[lang].facetTitles));
		this.cachedViews.search[lang] = (
			<FacetedSearch 
				config={this.props.config} 
				facetList={facetList}
				labels={languageKeys[lang]} 
				onChange={this.onResultsChange.bind(this)}
				onSelect={this.navigateToResult.bind(this)}	 />
		);

		return this.cachedViews.search[lang];
	}


	render() {
		return (
			<div className="app">
				<header>
					<a onClick={this.navigateHome.bind(this)}>
						<img height="64" src="data:image/png;base64,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"/>
						<h1>BoschDoc</h1>
					</a>

					<img className="hi-logo" height="66px" src="http://www.huygens.knaw.nl/wp-content/themes/BDboilerplate/images/logo.png" width="92px" />
					<nav>
						<a className={this.state.language === "nl" ? "selected" : null} data-lang="nl" onClick={this.navigateLanguage.bind(this)} >
							Ned
						</a>&nbsp;
						<a className={this.state.language === "en" ? "selected" : null} data-lang="en" onClick={this.navigateLanguage.bind(this)} >
							Eng
						</a>&nbsp;
						<a className={this.state.language === "es" ? "selected" : null} data-lang="es" onClick={this.navigateLanguage.bind(this)} >
							Esp
						</a>
					</nav>
				</header>
				<div style={this.state.controller === "document" ? {display: "block"} : {display : "none"}}>
					<Document 
						activeTab={this.state.activeTab} 
						annotationId={this.props.annotationId} 
						id={this.state.id} 
						language={this.state.language} />
				</div>
				<div style={this.state.controller === "search" ? {display: "block"} : {display : "none"}}>
					{this.renderFacetedSearch(this.state.language)}
				</div>
			</div>
		);
	}
}

AppController.propTypes = {
	activeTab: React.PropTypes.string,
	annotationId: React.PropTypes.string,
	config: React.PropTypes.object,
	controller: React.PropTypes.string,
	id: React.PropTypes.string,
	language: React.PropTypes.string
}


export default AppController;