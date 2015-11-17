import React from "react";


class Paginator extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let prevLink = this.props.onPrevClick ?
			<li onClick={this.props.onPrevClick}>&lt; {this.props.labels.previous}</li> :
			null;

		let nextLink = this.props.onNextClick ?
			<li onClick={this.props.onNextClick}>{this.props.labels.next} &gt;</li> :
			null;

		return (
			<ul className="hire-paginator">
				{prevLink}
				<li onClick={this.props.onSearchClick}>{this.props.labels.search}</li>
				{nextLink}
			</ul>
		);
	}
}

Paginator.propTypes = {
	labels: React.PropTypes.object,
	onNextClick: React.PropTypes.func,
	onPrevClick: React.PropTypes.func,
	onSearchClick: React.PropTypes.func.isRequired
};

Paginator.defaultProps = {
	labels: {
		search: "Zoeken",
		previous: "Vorige",
		next: "Volgende"
	}
};

export default Paginator;
