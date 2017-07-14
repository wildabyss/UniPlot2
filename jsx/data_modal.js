class DataModal extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {
			progress: -1,
			shallow_data_sources: props.dataSources,
		};
	};
	
	componentDidUpdate() {
		// make checkboxes
		$("#data_modal .list-group.checked-list-box > .list-group-item").checkbox();
	};
	
	addFileButton(){
		$("#file_add_data").click();
	};
	
	addFile(ev){
		var file = ev.target.files[0];
		if (file === undefined)
			return;
		Plotter.read(file, this,
			function(react_component, progress){
				// on reading function
			
				react_component.setState({
					progress: progress
				});
			}, 
			function(react_component){
				// complete function
						
				react_component.setState({
					progress: -1,
					shallow_data_sources: Plotter.data_sources.shallowCopy()
				});
				
				// redraw plots
				Plotter.redraw();
			});
	};
	
	removeFile(file_name){
		delete Plotter.data_sources[file_name];
		this.setState({
			shallow_data_sources: Plotter.data_sources.shallowCopy()
		});
	};
	
	selectFile(file_name){
		Plotter.data_sources[file_name].active = !Plotter.data_sources[file_name].active;
		this.setState({
			shallow_data_sources: Plotter.data_sources.shallowCopy()
		});
	};
	
	render(){
		var fieldsetChildren = [];
		for (var file_name in this.state.shallow_data_sources){
			var id = file_name.replaceAll(' ', '-');
		
			fieldsetChildren.push(
				<DataModalDataRow key={id} fileName={file_name} 
					remove={this.removeFile.bind(this, file_name)}
					select={this.selectFile.bind(this, file_name)}
					selected={this.state.shallow_data_sources[file_name].active} />
			);
		};

		return (
			<div className="react-root">
				<DataModalProgress progress={this.state.progress} />
				<DataModalAddData onClick={this.addFileButton} progress={this.state.progress} />
				<input id="file_add_data" className="hidden" type="file" onChange={this.addFile.bind(this)} value="" />
				<fieldset>
					<div className="container-fluid">
						{fieldsetChildren}
					</div>
				</fieldset>
			</div>
		);
	};
}

class DataModalProgress extends React.Component{
	render(){
		var stylesMain = {display: (this.props.progress>0?"block":"none")};
		var stylesSub = {width: this.props.progress.toString() + "%"};
	
		return (
			<div className="progress" style={stylesMain}>
				<div className="progress-bar" role="progressbar" aria-valuenow={this.props.progress} aria-valuemin="0" aria-valuemax="100" style={stylesSub}>
					{this.props.progress}%
				</div>
			</div>
		);
	}
}

class DataModalAddData extends React.Component{
	render(){
		var stylesMain = {display: (this.props.progress>0?"none":"block")};
	
		return (
			<button className="btn btn-primary btn-block btn-sm" id="btn_add_data" style={stylesMain} onClick={this.props.onClick}>Add Data File</button>
		);
	}
}

class DataModalDataRow extends React.Component{
	render(){
		return (
			<div className="row small">
				<div className="col-xs-12">
					<ul className="list-group checked-list-box">
						<li className="list-group-item" data-checked={this.props.selected} onClick={this.props.select}>{this.props.fileName}</li>
					</ul>
					<button className="btn btn-warning btn-sm" onClick={this.props.remove}><span className="glyphicon glyphicon-remove"></span></button>
				</div>
			</div>
		);
	}
}