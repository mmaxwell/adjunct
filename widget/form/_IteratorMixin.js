define([
	"dojo/_base/declare"
], function (declare) {
	return declare(null, {
		// summary:
		//		Mixin for executing functions against every child of a container.
		perChild: function (/*Function*/ fn, /*Object?*/ context) {
			// summary:
			//		Executes a function for every child.
			// fn: Function
			//		Function to be executed.
			// context: [optional] Object
			//		Context in which to execute the function.  If context is not
			//		provided, context is defaulted to the child.
			var children = this.getChildren(),
				i = 0,
				child;

			if (children) {
				while (child = children[i++]) {
					fn.call(context || child, child, i, children);
				}
			}
		}
	});
});