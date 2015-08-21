import React from "react";
import languageKeys from "../stores/i18n-keys";
import LanguageFilter from "../stores/i18n-filter";

class Metadata extends React.Component {

	constructor(props) {
		super(props);
		this.metadataKeys = new LanguageFilter(this.props.language, this.props.metadata.map(function(entry) { return entry.field}));
	}

	renderMetadataField(entry, i) {
		return (
			<li key={i}>
				<label>{languageKeys[this.props.language].facetTitles[entry.field]}</label>
				<span>{entry.value}</span>
			</li>
		);
	}

	render() {
		return (
			<ul className="metadata">
				{this.props.metadata.filter(entry => entry.value !== "" && this.metadataKeys.indexOf(entry.field) > -1).map(this.renderMetadataField.bind(this))}
			</ul>
		);
	}
}

Metadata.propTypes = {
	language: React.PropTypes.string,
	metadata: React.PropTypes.array,
};


export default Metadata;

