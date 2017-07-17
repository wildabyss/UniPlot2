/**
 * Enhancement to the Bootstrap checkbox
 */
$.fn.extend({
	checkbox: function(action){
		if (action == undefined){
			return this.each(function () {
			
				// Settings
				var $widget = $(this),
					$checkbox = $('<input type="checkbox" class="hidden" />'),
					color = ($widget.data('color') ? $widget.data('color') : "primary"),
					style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
					settings = {
						on: {
							icon: 'glyphicon glyphicon-check'
						},
						off: {
							icon: 'glyphicon glyphicon-unchecked'
						}
					};

				// Actions
				function updateDisplay() {
					var isChecked = $checkbox.is(':checked');

					// Set the button's state
					$widget.data('state', (isChecked) ? "on" : "off");

					// Set the button's icon
					$widget.find('.state-icon')
						.removeClass()
						.addClass('state-icon ' + settings[$widget.data('state')].icon);

					// Update the button's color
					if (isChecked) {
						$widget.addClass(style + color + ' active');
					} else {
						$widget.removeClass(style + color + ' active');
					}
				}

				// Initialization
				(function init() {
					$widget.css('cursor', 'pointer')
					if ($widget.find('input[type="checkbox"]').length==0)
						$widget.append($checkbox);
					else
						$checkbox = $widget.find('input[type="checkbox"]');

					// Event Handlers
					$widget.on('click', function () {
						$checkbox.prop('checked', !$checkbox.is(':checked'));
						$checkbox.triggerHandler('change');
						updateDisplay();
					});
					$checkbox.on('change', function () {
						updateDisplay();
					});
					
					// Set checkbox based on property
					if ($widget.attr('data-checked') == "true") {
						$checkbox.prop('checked', true);
					}
					
					updateDisplay();

					// Inject the icon if applicable
					if ($widget.find('.state-icon').length == 0) {
						$widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
					}
				})();
			});
		} else if (action == 'unmount'){
			// remove events
			$(this).off();
		}
	}
});