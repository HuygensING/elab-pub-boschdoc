import React from "react";

class SourceInfo extends React.Component {

	constructor(props) {
		super(props);

		this.manuscriptTypes = ["Manuscript", "Oude druk"];
		this.state= {
			renderFunc: this.findRenderFunc(this.props.metadata)
		};
	}

	componentWillReceiveProps(newProps) {
		this.setState({renderFunc: this.findRenderFunc(newProps.metadata)});
	}

	findRenderFunc(metadata) {
		for(let i in metadata) {
			let md = metadata[i];
			if(md.field === "Document type" && this.manuscriptTypes.indexOf(md.value) > -1) {
				return this.renderManuscript.bind(this)
			}
		}
		return this.renderArchival.bind(this);
	}
/*


>  Bij het overige materiaal (document types 'oude druk' en 'manuscript') zou
> de volgorde moeten zijn:
> - Auteur
> -Titel
> - Plaats van publicatie
> - Jaar van publicatie
> - Folio nummer(s) of Pagina nummer(s)​

>Bij het archiefmateriaal zou de volgorde
> moeten zijn:
> - Locatie
> - Historische Instelling
> - Inventaris nummer
> - Folio nummer(s)



 [
 Object { field="Locatie",  value="'s-Hertogenbosch, Braban...isch Informatie Centrum"},
 Object { field="Datum",  value="1608"}, Object { field="Boekjaar",  value=""}, 
 Object { field="Historische instelling",  value=""}, 
 Object { field="Inventaris nummer",  value="14"}, 
 Object { field="Document type",  value="Manuscript"}, 
 Object { field="Folio nummer(s)",  value="10r - 10v"}, 
 Object { field="Pagina nummer(s)",  value=""}, 
 Object { field="Toegangsnummer",  value="108"}, 
 Object { field="Titel",  value="Origio opidi Buscoducensis 1184-1557"}, 
 Object { field="Auteur",  value="Balen, J. van; Everswijn, D.; Loeff, B."}, 
 Object { field="Plaats van publicatie",  value=""}, 
 Object { field="Jaar van publicatie",  value="1608"}, 
 Object { field="Persons mentioned",  value="Aken (alias Bosch), Jher...(Joen) Anthoniusz. van."}, 
 Object { field="Genoemde personen",  value="Aken (alias Bosch), Jher...(Joen) Anthoniusz. van."}, 
 Object { field="Personas Mencionadas",  value=""}, 
 Object { field="Themes",  value="Abigail and David. | Ado... Solomon and Bathsheba."}, 
 Object { field="Temas",  value=""}, 
 Object { field="Thema's",  value="Abigaïl en David. | Beth.... | Salomo en Bathseba."}
 ]

*/

	renderBody(filters) {
		return this.props.metadata
			.filter(md => filters.indexOf(md.field) > -1)
			.sort(function(a, b) { return filters.indexOf(a.field) > filters.indexOf(b.field) })
			.map(md => md.value)
			.filter(val => val !== "")
			.join(" ; ");
	}

	renderManuscript() {
		return this.renderBody(["Auteur", "Titel", "Plaats van publicatie", "Jaar van publicatie", "Folio nummer(s)", "Pagina nummer(s)"]);

	}

	renderArchival() {
		return this.renderBody(["Locatie", "Historische instelling", "Inventaris nummer", "Folio nummer(s)"]);
	}

	render() {
		return (
			<div className="source-info" title={this.state.renderFunc()}>
				{this.state.renderFunc()}
			</div>
		);
	}
}

SourceInfo.propTypes = {
	metadata: React.PropTypes.array,
};


export default SourceInfo;

