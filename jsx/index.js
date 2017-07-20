"use strict";

class UniPlotApp extends React.Component{
	constructor(props) {
		super(props);
		
		this.state={
			refresh: 1,
		}
	};
	
	refresh(){
		this.setState({refresh: 1});
	};

	render(){
		return (
			<div className="react-root">
				<NavComponent refresh={this.refresh.bind(this)} />
				<MainComponent />
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