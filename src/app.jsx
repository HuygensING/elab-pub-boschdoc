import React from "react";
import appRouter from "./router";
import appStore from "./stores/app";
import languageKeys from "./stores/i18n-keys";
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

	navigateSample(ev) {
		appRouter.navigateToResult({id: "LINKTEST"});
	}

	navigateToResult(obj) {
		appRouter.navigateToResult({id: obj.id});
	}

	renderFacetedSearch(lang) {
		this.cachedViews.search[lang] = this.cachedViews.search[lang] ||
			<FacetedSearch config={this.props.config} i18n={languageKeys[lang]} onChange={this.navigateToResult.bind(this)} />
		return this.cachedViews.search[lang];
	}


	render() {
		return (
			<div className="app">
				<header>
					<a onClick={this.navigateHome.bind(this)}>
						<img src={api.docroot + "/img/logo.png"} />
						<h1>BoschDoc</h1>
					</a>
					<img className="hi-logo" height="66px" src="http://www.huygens.knaw.nl/wp-content/themes/BDboilerplate/images/logo.png" width="92px" />
					<nav>
						<a onClick={this.navigateSample.bind(this)}>voorbeeld record</a>&nbsp;
						<a className={this.state.language === "nl" ? "selected" : null} data-lang="nl" onClick={this.navigateLanguage.bind(this)} >
							NL
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
					<Document activeTab={this.state.activeTab} annotationId={this.props.annotationId} id={this.state.id} language={this.state.language} />
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
	children: React.PropTypes.node,
	config: React.PropTypes.object,
	controller: React.PropTypes.string,
	id: React.PropTypes.string,
	language: React.PropTypes.string
}


export default AppController;