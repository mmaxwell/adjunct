define([
	"dojo/_base/declare",
	"../../compat/es5polyfills"
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
			var children = this.getChildren();

			if (children) {
				children.forEach(fn, context);
			}
		}
	});
});
