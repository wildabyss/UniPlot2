class MainComponent extends React.Component{
	constructor(props) {
		super(props);
		
		this.rebuildSortedParametersList(true);
	};
	
	rebuildSortedParametersList(is_construct){
		var parameters_list = [];
		for (var data_name in Plotter.data_sources){
			var data_source = Plotter.data_sources[data_name];
			if (data_source.active){
				data_source.fields.forEach(function(field){
					if (parameters_list.binarySearch(field) == -1){
						parameters_list.push(field);
						parameters_list.sort();
					}
				});
			}
		}
		
		if (is_construct){
			this.state={
				sorted_parameters_list: parameters_list,
			};
		} else {
			this.setState({
				sorted_parameters_list: parameters_list,
			});
		}
	}
	
	addFile(){
		// parent component handler
		if (this.props.hasOwnProperty('addFile'))
			this.props.addFile();
		
		this.rebuildSortedParametersList(false);
	}
	
	removeFile(){
		// parent component handler
		if (this.props.hasOwnProperty('removeFile'))
			this.props.removeFile();
		
		this.rebuildSortedParametersList(false);
	}
	
	selectFile(){
		// parent component handler
		if (this.props.hasOwnProperty('selectFile'))
			this.props.selectFile();
		
		this.rebuildSortedParametersList(false);
	}
	
	render(){
		return (
			<main>
				<div className="modal fade" id="data_modal" role="dialog">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 className="modal-title">Data Sources</h4>
							</div>
							<div className="modal-body">
								<DataModal addFile={this.addFile.bind(this)} removeFile={this.removeFile.bind(this)} selectFile={this.selectFile.bind(this)} />
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>
				
				<div className="modal fade" id="plotting_modal" role="dialog">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 className="modal-title">Plotting</h4>
							</div>
							<div className="modal-body">
								<PlottingModal sortedParametersList={this.state.sorted_parameters_list} />
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	};
}