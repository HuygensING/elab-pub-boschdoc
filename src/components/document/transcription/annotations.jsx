import React from "react";


class Annotations extends React.Component {

	renderAnnotation(annotation, i) {
		return (<div className={this.props.highlighted == annotation.n ? "highlighted" : null} id={annotation.n} key={i}>
			<em>{annotation.type.name}</em>, <span dangerouslySetInnerHTML={{__html: annotation.text}} />
		</div>);
	}

	render() {
		return (
			<div className="annotations">
				{this.props.data.map(this.renderAnnotation.bind(this))}
			</div>
		)
	}
}

Annotations.propTypes = {
	data: React.PropTypes.array,
	highlighted: React.PropTypes.string
};


export default Annotations;