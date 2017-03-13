import React from "react";

const HIGHLIGHT_CLASSNAME = "hi-annotation-highlight";

class Annotation extends React.Component {

	render() {
		return (
			<li className={this.props.highlighted ? HIGHLIGHT_CLASSNAME : ""}
				id={this.props.n}
				onClick={this.props.onClick.bind(this, this.props.n)}
				onMouseOut={this.props.onHover.bind(this, "")}
				onMouseOver={this.props.onHover.bind(this, this.props.n)}>
				<em>{this.props.type.name}</em>, <span dangerouslySetInnerHTML={{__html: this.props.text}} />
			</li>
		);
	}
}

Annotation.propTypes = {
	highlighted: React.PropTypes.bool,
	n: React.PropTypes.number,
	onClick: React.PropTypes.func,
	onHover: React.PropTypes.func,
	text: React.PropTypes.string,
	type: React.PropTypes.object
};

export default Annotation;