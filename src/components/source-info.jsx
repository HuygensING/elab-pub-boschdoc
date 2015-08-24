import React from "react";

class SourceInfo extends React.Component {


	render() {
		return (
			<span title={JSON.stringify(this.props.metadata)}>
				TODO Bron: {JSON.stringify(this.props.metadata)}
			</span>
		);
	}
}

SourceInfo.propTypes = {
	metadata: React.PropTypes.array,
};


export default SourceInfo;

