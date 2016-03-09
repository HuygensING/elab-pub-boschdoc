import React from "react";
import ExternalLinkIcon from "./icons/external-link";


class ThemesAnnotation extends React.Component {

	render() {
		const texts = this.props.text.split("|");
		const { metadata } = this.props.type;

		let links = Object.keys(metadata).indexOf("Boschdocproject Artworks Code") > -1 ?
			metadata["Boschdocproject Artworks Code"].split("|").map((l) => l.trim()) : null;

		return (<li id={this.props.n} onMouseOut={this.props.onHover.bind(this, "")} onMouseOver={this.props.onHover.bind(this, this.props.n)}>
			{texts.map((t, i) => links && links[i] && links[i].length ?
				(<span key={i}>
					<a href={`http://boschproject.org/#!/artworks/${links[i]}`} target="_blank">
						{t}
					</a>
					<a href={`http://boschproject.org/#!/artworks/${links[i]}`} target="_blank">
						<ExternalLinkIcon />
					</a>
					{i < texts.length - 1 ? "|" : ""}
				</span>) :
				(<span key={i}>{t}{i < texts.length - 1 ? "|" : ""}</span>)
			)}
		</li>);
	}
}

ThemesAnnotation.propTypes = {
	n: React.PropTypes.number,
	onHover: React.PropTypes.func,
	text: React.PropTypes.string
};

export default ThemesAnnotation;