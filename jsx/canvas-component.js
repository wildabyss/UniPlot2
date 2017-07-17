class CanvasCollection extends React.Component{
	constructor(props) {
		super(props);
	};
	
	componentDidUpdate() {
		Plotter.redraw();
	};
	
	render(){
		var plots = [];
		for (var i=0; i<Plotter.plot_parameters_array.length; i++){
			plots.push(
				<div className="plot_container" key={i}>
					<canvas className="plot_main" width="5" height="5"></canvas>
				</div>);
		}
	
		return(
			<div className="canvas_collection">
				{plots}
			</div>
		);
	};
}