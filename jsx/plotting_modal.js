class PlottingModal extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {
			selected: 0,
			plot_parameters_array: Plotter.plot_parameters_array.slice(),
			sorted_parameters_list: props.sortedParametersList,
		};
	};
	
	componentWillReceiveProps(nextProps){
		this.setState({
			sorted_parameters_list: nextProps.sortedParametersList,
		});
	};
	
	componentDidUpdate() {
		// make checkboxes
		$("#plotting_modal .list-group.checked-list-box > .list-group-item").checkbox();
	};
	
	selectPlot(){
		
	};
	
	addPlot(){
		
	};
	
	editPlotTitle(){
		
	};
	
	removePlot(){
		
	};
	
	paramSelect(param_name){
		
	};
	
	axisSelect(param_name){
		
	};
	
	xvarSelect(param_name){
		
	};
	
	render(){
		var fieldsetChildren = [];
		var plot_parameters = this.state.plot_parameters_array[this.state.selected];
		
		for (var i=0; i<this.state.sorted_parameters_list.length; i++){
			var this_param_name = this.state.sorted_parameters_list[i];
			var selected = false;
			
			if (plot_parameters !== undefined){
				for (var param_name in plot_parameters.parameters){
					if (param_name == this_param_name){
						selected = true;
						break;
					}
				}
			}
			
			fieldsetChildren.push(
				<PlottingModalParameter key={i} parameterName={this_param_name} 
					select={this.paramSelect.bind(this, this_param_name)}
					axisSelect={this.axisSelect.bind(this, this_param_name)}
					selected={selected} />
			);
		};
	
		return (
			<div className="react-root">
				<PlottingModalSelector />
				<fieldset>
					<div className="container-fluid">
						{fieldsetChildren}
					</div>
				</fieldset>
				<PlottingModalXVar />
			</div>
		);
	};
}

class PlottingModalSelector extends React.Component{
	render(){
		return (
			<div className="row small">
				<div className="col-xs-12">
					<select className="form-control"></select>
					<button className="btn btn-primary btn-sm" onClick={this.props.add}><span className="glyphicon glyphicon-plus"></span></button>
					<button className="btn btn-warning btn-sm" onClick={this.props.edit}><span className="glyphicon glyphicon-pencil"></span></button>
					<button className="btn btn-warning btn-sm" onClick={this.props.remove}><span className="glyphicon glyphicon-remove"></span></button>
				</div>
			</div>
		);
	}
}

class PlottingModalParameter extends React.Component{
	componentWillUpdate(nextProps, nextState){
		$("#plotting_modal .list-group.checked-list-box > .list-group-item").checkbox('unmount');
	}
	
	render(){
		return (
			<div className="row small">
				<div className="col-xs-12">
					<ul className="list-group checked-list-box">
						<li className="list-group-item" data-checked={this.props.selected} onClick={this.props.select}>{this.props.parameterName}</li>
					</ul>
					<button className="btn btn-primary btn-sm" onClick={this.props.axisSelect}>Primary Axis</button>
				</div>
			</div>
		);
	}
}

class PlottingModalXVar extends React.Component{
	render(){
		return (
			<div className="row small">
				<div className="col-xs-12">
					<select className="form-control xvar"></select>
				</div>
			</div>
		);
	}
}