import React from "react";
import appRouter from "./router";
import appStore from "./stores/appStore";
import i18nStore from "./stores/i18n";
import languageKeys from "./stores/i18n-keys";
import FacetedSearch from "hire-faceted-search";
import Document from "./components/document-controller";

class AppController extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			i18n: i18nStore.getState(),
			app: { controller: this.props.controller || "search", id: this.props.id || null }
		};
		this.languageChangeListener = this.onStoreChange.bind(this);
		this.controllerChangeListener = this.onStoreChange.bind(this);
	}

	componentDidMount() {
		i18nStore.listen(this.languageChangeListener);
		appStore.listen(this.controllerChangeListener);
	}

	componentWillUnmount() {
		i18nStore.stopListening(this.languageChangeListener);
		appStore.stopListen(this.controllerChangeListener);
	}

	onStoreChange() {
		this.setState({
			i18n: i18nStore.getState(),
			app: appStore.getState()
		});
	}

	navigateHome(ev) {
		appRouter.navigate("/" + this.state.i18n.language + "/search");
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

	render() {
		return (
			<div className="app">
				<header>
					<h1><a onClick={this.navigateHome.bind(this)}>BoschDoc</a></h1>
					<img height="66px" src="http://www.huygens.knaw.nl/wp-content/themes/BDboilerplate/images/logo.png" width="92px" />
					<nav>
						<a onClick={this.navigateSample.bind(this)}>voorbeeld record</a>&nbsp;
						<a className={this.state.i18n.language === "nl" ? "selected" : null} data-lang="nl" onClick={this.navigateLanguage.bind(this)} >
							NL
						</a>&nbsp;
						<a className={this.state.i18n.language === "en" ? "selected" : null} data-lang="en" onClick={this.navigateLanguage.bind(this)} >
							Eng
						</a>&nbsp;
						<a className={this.state.i18n.language === "es" ? "selected" : null} data-lang="es" onClick={this.navigateLanguage.bind(this)} >
							Esp
						</a>

					</nav>
				</header>
				<div style={this.state.app.controller === "document" ? {display: "block"} : {display : "none"}}>
					<Document language={this.state.i18n.language} id={this.state.app.id} />
				</div>
				<div style={this.state.app.controller === "search" ? {display: "block"} : {display : "none"}}>
					<FacetedSearch config={this.props.config} i18n={languageKeys[this.state.i18n.language]} onChange={this.navigateToResult.bind(this)} />
				</div>
			</div>
		);
	}
}

AppController.propTypes = {
	children: React.PropTypes.node,
	config: React.PropTypes.object,
	controller: React.PropTypes.string,
	id: React.PropTypes.string
}


export default AppController;