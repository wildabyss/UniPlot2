class UniPlotApp extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {
			shallow_data_sources: props.dataSources,
			plot_parameters_array: props.plotParametersArray,
		};
	};

	render(){
		return (
			<div className="react-root">
				<NavComponent />
				<MainComponent dataSources={this.state.shallow_data_sources} />
			</div>
		);
	};
}


$(document).ready(function () {
	ReactDOM.render(<UniPlotApp 
		dataSources={Plotter.data_sources.shallowCopy()} 
		plotParametersArray={Plotter.plot_parameters_array.slice()} />, 
		$(".container")[0]);
});


// Collapse menu after item clicked
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});