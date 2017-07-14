class PlottingModal extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {
			selected: 0,
			plot_parameters_array: props.plotParametersArray,
		};
	};
	
	componentDidUpdate() {
		// make checkboxes
		$("#plotting_modal .list-group.checked-list-box > .list-group-item").checkbox();
	};
	
	render(){
		var fieldsetChildren = [];
		this.state.plot_parameters_array.forEach(function(plot_parameters){
			fieldsetChildren.push(
				<DataModalDataRow key={plot_parameters.title} fileName={plot_parameters.title} 
					remove={this.removeFile.bind(this, file_name)}
					select={this.selectFile.bind(this, file_name)}
					selected={this.state.shallow_data_sources[file_name].active} />
			);
		});
	
		return (
			<div className="react-root">
				<PlottingModalSelector />
				<fieldset>
					<div className="container-fluid">
						{fieldsetChildren}
					</div>
				</fieldset>
			</div>
		);
	};
}

class PlottingModalSelector extends React.Component{
	render(){
		return (
			<div className="row small">
				<div className="col-xs-12">
					<select className="form-control"><option>1</option></select>
					<button className="btn btn-primary btn-sm" onClick={this.props.add}><span className="glyphicon glyphicon-plus"></span></button>
					<button className="btn btn-warning btn-sm" onClick={this.props.edit}><span className="glyphicon glyphicon-pencil"></span></button>
					<button className="btn btn-warning btn-sm" onClick={this.props.remove}><span className="glyphicon glyphicon-remove"></span></button>
				</div>
			</div>
		);
	}
}

class PlottingModalParameter extends React.Component{
	render(){
		return (
			<div className="row small">
				<div className="col-xs-12">
					<ul className="list-group checked-list-box">
						<li className="list-group-item" data-checked={this.props.selected} onClick={this.props.select}>{this.props.parameterName}</li>
					</ul>
					<button className="btn btn-primary btn-sm" onClick={this.props.remove}>Primary Axis</button>
				</div>
			</div>
		);
	}
}