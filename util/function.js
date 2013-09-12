define([
	"./array"
], function (arrayUtil) {
	return {
		partial: function (/*Function*/ fn) {
			// summary
			//		Creates a function that has partially hardwired values.
			//		May use undefined as a placeholder.  undefined variables are replaced
			//		by arguments that are passed in at the time of function execution.
			//		They are replaced in the order in which they are received. 
			//		Any extra parameters, are appended to the argument list.
			//	|	var fn = fnUtil.partial(fn, 1, undefined, 2);
			//	|	fn(4, 5); // fn(1,4,2, 5);

			var	partial = this.partial,
				args = arrayUtil.create(arguments, 1);

			return function () {
				var counter = 0,
					i = 0,
					limit = arguments.length,
					total = args.length;

				for (; i < total && counter < limit; i++) {
					if (args[i] === undefined) {
						args[i] = arguments[counter++];
					}
				}

				return fn.apply(this, args.concat(arrayUtil.create(arguments, counter)));
			}
		}
	};
});