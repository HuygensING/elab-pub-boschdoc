import React from "react";
import TextLayer from "./text-layer";
import actions from "../../actions/document";
import documentStore from "../../stores/document";
import i18nStore from "../../stores/i18n";

class DocumentController extends React.Component {

	constructor(props) {
		super(props);
		this.state = {id: null, i18n: i18nStore.getState()};
	}

	componentDidMount() {
		documentStore.listen(this.onStoreChange.bind(this));
		i18nStore.listen(this.onStoreChange.bind(this));
		actions.getDocument(this.props.id);
	}

	componentWillReceiveProps(newProps) {
		actions.getDocument(newProps.id);
	}

	componentWillUnmount() {
		documentStore.stopListening(this.onStoreChange.bind(this));
		i18nStore.stopListening(this.onStoreChange.bind(this));
	}

	onStoreChange() {
		let state = documentStore.getState(), keys = i18nStore.getState().keys;

		this.setState({
			id: state.id,
			i18n: i18nStore.getState(),
			facsimiles: state.facsimiles,
			transcription: state.paralleltexts[keys.transcription],
			remarks: state.paralleltexts[keys.remarks],
			translation: state.paralleltexts[keys.translation]
		});
	}

	render() {
		if(this.state.id === null) {
			return (<div />)
		} else {
			let facs = this.state.facsimiles.length > 0 ?
				(<iframe className="facsimile" key={this.state.facsimiles[0].title} src={this.state.facsimiles[0].zoom}></iframe>) :
				"no facsimile";

			let keys = this.state.i18n.keys;
			let transcription = this.state.transcription ?
				<TextLayer data={this.state.transcription} label={keys.transcription}  /> :
				null;
			let remarks = this.state.remarks ?
				<TextLayer data={this.state.remarks} label={keys.remarks}  /> :
				null;
			let translation = this.state.translation ?
				<TextLayer data={this.state.translation} label={keys.translation}  /> :
				null;

			return (
				<div>
					<div className="left-pane">
						{facs}
					</div>
					<div className="right-pane">
						<h1>{this.state.name}</h1>
						{transcription}
						{remarks}
						{translation}
					</div>
				</div>
			)
		}
	}
}


DocumentController.propTypes = {
	id: React.PropTypes.string
};

export  default DocumentController;