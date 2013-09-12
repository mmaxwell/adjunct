define([
	"dojo/on"
], function (on) {
	// summary:
	//		Extension event for adding pausable functionality to an event listener.
	//		Allows for Dojo widgets and Evented classes to have pausable events.
	return function (/*String*/ type) {
		// type: string
		//		Event type, e.g. "click"
		return function (/*Node|dijit/_WidgetBase|dojo/Evented*/ node, /*Function*/ listener) {
			// node: Node|dijit/_WidgetBase|dijit/Evented
			//		DOM node, _WidgetBase, or Evented classes to add the listener to.
			// listener: Function
			//		Handler to execute when event is triggered.  Will executed in the context of node.
			// returns
			//		Listener signal.
			var paused = false,
				signal;

			signal = on(node, type, function () {
				if (!paused) {
					listener.apply(node, arguments);
				}
			});

			signal.pause = function () {
				paused = true;
			};

			signal.resume = function () {
				paused = false;
			};

			signal.isPaused = function () {
				return paused;
			};

			return signal;
		};
	};
});