define([
	"dojo/_base/array",
	"./typeCheck"
], function (arrayUtil, typeCheck) {
	return {
		forEach: function (/*Array*/ array, /*Function*/ fn, /*Object?*/ context, /*Number?*/ index, /*Number?*/ limitter) {
			// summary:
			//		Execute a function for every item in an array.
			//		If the executed function returns false, the iteration is stopped.
			// array: Array
			//		Array to iterate through.
			// fn: Function
			//		Function to execute for each item.
			// context: [optional] Object
			//		Object to which the context of the function call will be set.
			// index: [optiona] Number
			//		Index at which to start the loop.
			// limitter: [optional] Number
			//		If positive, will be the index at which to terminate the loop.
			//		If negative, the number will be subtracted from the limit at which the loop will terminate.

			var i = index || 0,
				limit = limitter < 0 ? array.length + limitter : limitter;

			for (; i < limit; i++) {
				if (fn.call(context, array[i], i, array) === false) {
					break;
				}
			}
		},
		forEachReverse: function (/*Array*/ array, /*Function*/ fn, /*Object?*/ context, /*Number?*/ index, /*Number?*/ limitter) {
			// summary:
			//		Functions as forEach but in reverse order.
			// array: Array
			//		Array to iterate through.
			// fn: Function
			//		Function to execute for each item.
			// context: [optional] Object
			//		Object to which the context of the function call will be set.
			// index: [optiona] Number
			//		Index at which to start the loop.
			// limitter: [optional] Number
			//		If positive, will be the index at which to terminate the loop.
			//		If negative, the number will be subtracted from the limit at which the loop will terminate.

			var i = index || array.length,
				limit = limitter < 0 ? 0 - limitter : limitter;

			while (i--) {
				if (fn.call(context, array[i], i, array) === false || i === limit) {
					break;
				}
			}
		},
		not: function (/*Array*/ array, /*any*/ not) {
			// summary:
			//		Return the first item that is not a given object.
			// array: Array
			//		Array to iterate through.
			// not: any
			//		Item that is not desired.
			// returns
			//		Object that is not the provided object or null.

			var result = null,
				matcher = function (object) {
					return not === object;
				};

			if (typeCheck.isFunction(not)) {
				matcher = not;
			}

			arrayUtil.some(array, function (object) {
				var match = matcher(object);

				if (!match) {
					result = object;
				}

				return !match;
			});

			return result;
		},
		notReverse: function (/*Array*/ array, /*any*/ not) {
			// summary:
			//		Functions as not, but in reverse order.
			// array: Array
			//		Array to iterate through.
			// not: any
			//		Item that is not desired.
			// returns
			//		Object that is not the provided object or null.

			var result = null,
				matcher = function (object) {
					return not === object;
				};

			this.forEachReverse(array, function (object) {
				var match = matcher(object);

				if (!match) {
					result = object;
				}

				return match;
			});

			return result;
		},
		create: function (/*any*/ object, /*Number?*/ index) {
			// summary:
			//		Attempts to convert an object into an array.
			// object: any
			//		Object that will be converted.
			// index: [optional] Number
			//		Index at which to splice.
			// returns
			//		An array.

			return Array.prototype.splice.call(object, index === undefined ? 0 : index);
		}
	};
});