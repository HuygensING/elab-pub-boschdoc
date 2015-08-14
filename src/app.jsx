import React from "react";
import appRouter from "./router";
import i18nStore from "./stores/i18n";


class AppController extends React.Component {

	constructor(props) {
		super(props);
		this.state = i18nStore.getState();
	}

	componentDidMount() {
		i18nStore.listen(this.onStoreChange.bind(this));
	}


	componentWillUnmount() {
		i18nStore.stopListening(this.onStoreChange.bind(this));
	}

	onStoreChange() {
		this.setState(i18nStore.getState());
	}

	navigateHome(ev) {
		appRouter.navigate("/" + this.state.language + "/search");
	}

	navigateLanguage(ev) {
/*		let [,,lang, controller, id] = location.pathname.split("/");
		let path = "/" + ev.target.getAttribute("data-lang");
		if(controller) { path += "/" + controller; }
		if(id) { path += "/" + id; }
		*/
		appRouter.navigate("/" + ev.target.getAttribute("data-lang") + "/search");
	}

	render() {
		return (
			<div className="container">
				<header>
					<h1><a onClick={this.navigateHome.bind(this)}>BoschDoc</a></h1>
					<img height="66px" src="http://www.huygens.knaw.nl/wp-content/themes/BDboilerplate/images/logo.png" width="92px" />
					<nav>
						<a className={this.state.language === "nl" ? "selected" : null} data-lang="nl" onClick={this.navigateLanguage.bind(this)} >
							Nederlands
						</a>&nbsp;
						<a className={this.state.language === "en" ? "selected" : null} data-lang="en" onClick={this.navigateLanguage.bind(this)} >
							English
						</a>&nbsp;
						<a className={this.state.language === "es" ? "selected" : null} data-lang="es" onClick={this.navigateLanguage.bind(this)} >
							Español
						</a>
					</nav>
				</header>

				{React.Children.map(this.props.children, function(child) { return child; }) }
			</div>
		);
	}
}

AppController.propTypes = {
	children: React.PropTypes.node
}


export default AppController;