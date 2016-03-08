import React from "react";
import ExternalLinkIcon from "./icons/external-link";


class ThemesAnnotation extends React.Component {

	render() {
		console.log(Object.keys(this.props));
		let linkId = this.props.text.replace(/^.*\[([0-9]+)\].*$/, "$1");
		let remainingText = this.props.text.replace(/\[([0-9]+)\]/, "");
		return (<li
				id={this.props.n}
				onMouseOut={this.props.onHover.bind(this, "")}
				onMouseOver={this.props.onHover.bind(this, this.props.n)}>
				<a href={`http://boschproject.org/#!/artworks/${linkId}`} target="_blank">
					{remainingText}
				</a>
				<a href={`http://boschproject.org/#!/artworks/${linkId}`} target="_blank">
					<ExternalLinkIcon />
				</a>
		</li>);
	}
}

ThemesAnnotation.propTypes = {
	n: React.PropTypes.number,
	onHover: React.PropTypes.func,
	text: React.PropTypes.string
};

export default ThemesAnnotation;