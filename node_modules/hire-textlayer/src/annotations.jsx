import React from "react";
import Annotation from "./annotation";

class Annotations extends React.Component {

	onHover(annotationId) {
		if(this.props.onHover) { this.props.onHover("" + annotationId); }
	}

	onClick(annotationId) {
		if(this.props.onClick) { this.props.onClick(annotationId + "-text"); }
	}

	renderAnnotation(annotation, i) {
		let AnnotationComponent = this.props.customComponentMap && this.props.customComponentMap[annotation.type.name] ?
			this.props.customComponentMap[annotation.type.name] : Annotation;
		return (
			<AnnotationComponent
				{...annotation}
				highlighted={this.props.highlighted == annotation.n}
				key={i}
				onClick={this.onClick.bind(this)}
				onHover={this.onHover.bind(this)}
			/>
		);
	}

	render() {
		return (
			<ol className="hi-annotations">
				{this.props.data.map(this.renderAnnotation.bind(this))}
			</ol>
		);
	}
}

Annotations.propTypes = {
	customComponentMap: React.PropTypes.object,
	data: React.PropTypes.array,
	highlighted: React.PropTypes.string,
	onClick: React.PropTypes.func,
	onHover: React.PropTypes.func,
	relatedLabel: React.PropTypes.string
};

export default Annotations;