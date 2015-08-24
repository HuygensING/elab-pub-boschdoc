import React from "react";

class SourceInfo extends React.Component {


	render() {
		return (
			<span>
				SOURCE INFO: {JSON.stringify(this.props.metadata)}
			</span>
		);
	}
}

SourceInfo.propTypes = {
	metadata: React.PropTypes.array,
};


export default SourceInfo;

