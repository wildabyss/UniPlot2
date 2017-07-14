class NavComponent extends React.Component{
	render(){
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<div className="navbar-header navbar-left pull-left">
						<button type="button" className="pull-left navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="#">UniPlot</a>
					</div>
					<form className="navbar-form navbar-right pull-right">
						<div className="form-group">
							<button type="button" className="btn btn-success"><span className="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>
						</div>
					</form>
					<div className="visible-xs-block clearfix"></div>
					<div className="navbar-collapse collapse" id="navbar">
						<ul className="nav navbar-nav navbar-left">
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Data <span className="caret"></span></a>
								<ul className="dropdown-menu">
									<li><a href="#" type="button" data-toggle="modal" data-target="#data_modal">Data Sources</a></li>
									<li><a href="#" type="button" data-toggle="modal" data-target="#plotting_modal">Plotting</a></li>
								</ul>
							</li>
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Load <span className="caret"></span></a>
								<ul className="dropdown-menu">
									<li><a href="#" type="button">Session</a></li>
									<li><a href="#" type="button">Template</a></li>
								</ul>
							</li>
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Save <span className="caret"></span></a>
								<ul className="dropdown-menu">
									<li><a href="#" type="button">Session</a></li>
									<li><a href="#" type="button">Template</a></li>
									<li><a href="#" type="button">PDF</a></li>
								</ul>
							</li>
							<li><a href="#" id="hello" type="button">Annotate</a></li>
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Zoom <span className="caret"></span></a>
								<ul className="dropdown-menu">
									<li><a href="#" type="button">X-Axis</a></li>
									<li><a href="#" type="button">Y-Axis</a></li>
									<li><a href="#" type="button">Revert</a></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		)
	};
}