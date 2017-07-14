$(document).ready(function () {
	ReactDOM.render(<DataModal dataSources={Plotter.data_sources.shallowCopy()} />, $("#data_modal .modal-body")[0]);
});


// Collapse menu after item clicked
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});