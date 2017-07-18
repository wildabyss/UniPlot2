class ProgressBar extends React.Component{
	render(){
		var stylesMain = {
			display: (this.props.progress>0?"block":"none"),
		};
		if (this.props.hasOwnProperty('width'))
			stylesMain.width = this.props.width+'px';
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