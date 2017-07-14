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
	
	render(){
		return (
		
		);
	};
}