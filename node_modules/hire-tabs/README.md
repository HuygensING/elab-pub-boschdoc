# Hire Tabs

Tabs. You know and love.

## Example

	import {Tabs, Tab} from "hire-tabs";
	import {SomeComponent, SomeOtherComponents} from "some-component-collection"

	class MyTabbedComponent extends React.Component {
		handleTabChange(label, index) {
			let path = `/some-route/${label}`;

			// You could be using ReactRouter
			this.transitionTo(path);
		}

		render() {
			// You could be using ReactRouter
			let tabName = (this.getParams().hasOwnProperty("tab")) ?
				this.getParams().tab :
				"first-tab";

			return (
				<Tabs onChange={this.handleTabChange}>
					<Tab
						active={tabName === "first-tab"}
						label="First Tab">
						<SomeComponent />
					</Tab>
					<Tab
						active={tabName === "second-tab"}
						label="Second Tab">
						<SomeOtherComponent />
					</Tab>
				</Tabs>
			);
		}
	}

## Why doesn't Hire Tabs have an internal state?

An option would be to let `<Tabs>` have an internal state, which
tracks which `<Tab>` is active and upon state change, renders the required
`<Tab>`. But... This is behaviour which is sometimes unwanted, because you
want the parent component to decide which `<Tab>` is shown.