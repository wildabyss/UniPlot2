$(document).ready(function () {
	ReactDOM.render(<DataModal dataSources={Plotter.data_sources.shallowCopy()} />, $("#data_modal .modal-body")[0]);
});