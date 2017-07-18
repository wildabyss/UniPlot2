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
		this.setState({
			selected: parseInt($('select#sel_plot').val()),
		});
	};
	
	addPlot(){
		var plot_parameters = new PlotParameters('Plot ' + Plotter.plot_parameters_array.length);
		plot_parameters.addParameter(Plotter.data_sources, 'time', '', true);
		Plotter.plot_parameters_array.push(plot_parameters);
		
		this.setState({
			selected: Plotter.plot_parameters_array.length-1,
			plot_parameters_array: Plotter.plot_parameters_array.slice(),
		});
		
		if (this.props.hasOwnProperty('addPlot'))
			this.props.addPlot();
	};
	
	editPlotTitle(){
	
	
	
		if (this.props.hasOwnProperty('editPlotTitle'))
			this.props.editPlotTitle();
	};
	
	removePlot(){
		if (this.state.selected >= 0 && Plotter.plot_parameters_array.length > 0){
			// remove data set
			Plotter.plot_parameters_array.splice(this.state.selected, 1);
			
			this.setState({
				selected: Math.max(0, this.state.selected-1),
				plot_parameters_array: Plotter.plot_parameters_array.slice(),
			});
			
			if (this.props.hasOwnProperty('removePlot'))
				this.props.removePlot();
		}
	};
	
	paramSelect(param_name){
		if (this.state.selected >= 0 && Plotter.plot_parameters_array.length > 0){
			if (param_name in Plotter.plot_parameters_array[this.state.selected].parameters) {
				Plotter.plot_parameters_array[this.state.selected].removeParameter(Plotter.data_sources, param_name);
			} else {
				Plotter.plot_parameters_array[this.state.selected].addParameter(Plotter.data_sources, param_name, '', true);
			}
			
			this.setState({
				plot_parameters_array: Plotter.plot_parameters_array.slice(),
			});
			
			if (this.props.hasOwnProperty('parametersChanged'))
				this.props.parametersChanged();
		}
	};
	
	axisSelect(param_name){
		//plot_parameters_array[this.state.selected].parameters[param_name].
		console.log(param_name);
		
		if (this.props.hasOwnProperty('parametersChanged'))
			this.props.parametersChanged();
	};
	
	xvarSelect(){
		if (this.state.selected >= 0 && Plotter.plot_parameters_array.length > 0){
			var param_name = $("select#sel_xvar").val();
		
			Plotter.plot_parameters_array[this.state.selected].setXVar(Plotter.data_sources, param_name);
			
			this.setState({
				plot_parameters_array: Plotter.plot_parameters_array.slice(),
			});
			
			if (this.props.hasOwnProperty('parametersChanged'))
				this.props.parametersChanged();
		}
	};
	
	render(){
		var fieldsetChildren = [];
		var plot_parameters = this.state.plot_parameters_array[this.state.selected];
		
		for (var i=0; i<this.state.sorted_parameters_list.length; i++){
			var this_param_name = this.state.sorted_parameters_list[i];
			if (this_param_name == 'time' || this_param_name == plot_parameters.xvar)
				continue;
				
			var selected = false, is_primary = true;
			if (plot_parameters !== undefined){
				for (var param_name in plot_parameters.parameters){
					if (param_name == this_param_name){
						selected = true;
						is_primary = plot_parameters.parameters[param_name].is_primary;
						break;
					}
				}
			}
			
			fieldsetChildren.push(
				<PlottingModalParameter key={i} parameterName={this_param_name} 
					select={this.paramSelect.bind(this, this_param_name)}
					axisSelect={this.axisSelect.bind(this, this_param_name)}
					selected={selected} isPrimary={is_primary} />
			);
		};
	
		return (
			<div className="react-root">
				<PlottingModalSelector 
					add={this.addPlot.bind(this)} edit={this.editPlotTitle.bind(this)} remove={this.removePlot.bind(this)}
					select={this.selectPlot.bind(this)} selected={this.state.selected} />
				<fieldset>
					<div className="container-fluid">
						{fieldsetChildren}
					</div>
				</fieldset>
				<PlottingModalXVar select={this.xvarSelect.bind(this)}
					selectedPlot={this.state.selected} sortedParametersList={this.state.sorted_parameters_list} />
			</div>
		);
	};
}

class PlottingModalSelector extends React.Component{
	render(){
		var disabled = "true";
		if (Plotter.plot_parameters_array.length > 0)
			disabled = "false";
		
		var selectOptions = [];
		for (var i=0; i<Plotter.plot_parameters_array.length; i++){
			selectOptions.push(<option key={i} value={i}>{Plotter.plot_parameters_array[i].title}</option>);
		}
	
		return (
			<div className="row small">
				<div className="col-xs-12">
					<select id="sel_plot" className="form-control" value={this.props.selected} onChange={this.props.select}>
						{selectOptions}
					</select>
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
	};
	
	componentDidMount(){
		$('#plotting_modal input[data-toggle="toggle"]').bootstrapToggle({
			on: "Left Axis",
			off: "Right Axis",
			size: "mini",
			height: 34,
			width: 75,
		});
	};
	
	render(){
		return (
			<div className="row small">
				<div className="col-xs-12">
					<ul className="list-group checked-list-box">
						<li className="list-group-item" data-checked={this.props.selected} onClick={this.props.select}>{this.props.parameterName}</li>
					</ul>
					<input type="checkbox" data-toggle="toggle" checked={this.props.isPrimary} onChange={this.props.axisSelect} />
				</div>
			</div>
		);
	}
}

class PlottingModalXVar extends React.Component{
	render(){
		var selectOptions = [];
		var selectedValue = "";
		
		for (var i=0; i<this.props.sortedParametersList.length; i++){
			var param_name = this.props.sortedParametersList[i];
			
			if (this.props.selectedPlot < Plotter.plot_parameters_array.length && Plotter.plot_parameters_array[this.props.selectedPlot].xvar == param_name)
				selectedValue = param_name;
		
			selectOptions.push(<option key={param_name} value={param_name}>{param_name}</option>);
		};
		
		// default xvar
		if (selectedValue == "")
			selectedValue = "time";
	
		return (
			<div className="row small">
				<div className="col-xs-12">
					<select id="sel_xvar" className="form-control xvar" value={selectedValue} onChange={this.props.select}>
						{selectOptions}
					</select>
				</div>
			</div>
		);
	}
}