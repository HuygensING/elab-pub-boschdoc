import React from "react";
import appRouter from "./router";

class AppController extends React.Component {


	navigateLanguage(ev) {
		let [,,lang, controller, id] = location.pathname.split("/");
		let path = ev.target.getAttribute("data-lang");
		if(controller) { path += "/" + controller; }
		if(id) { path += "/" + id; }
		appRouter.navigate(path);
	}

	render() {
		return (
			<div>
				<a data-lang="nl" onClick={this.navigateLanguage.bind(this)} >
					NederLands
				</a> | <a data-lang="en" onClick={this.navigateLanguage.bind(this)} >
					English
				</a> | <a data-lang="es" onClick={this.navigateLanguage.bind(this)} >
					Español
				</a>
				{React.Children.map(this.props.children, function(child) { return (<div>{child}</div>); }) }
			</div>
		);
	}
}

AppController.propTypes = {
	children: React.PropTypes.node
}


export default AppController;