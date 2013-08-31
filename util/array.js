define([
	"dojo/_base/array",
	"./typeCheck"
], function (arrayUtil, typeCheck) {
	return {
		forEach: function (/*Array*/ array, /*Function*/ fn, /*Object?*/ context) {
			// summary:
			//		Execute a function for every item in an array.
			//		If the executed function returns false, the iteration is stopped.
			// array: Array
			//		Array to iterate through.
			// fn: Function
			//		Function to execute for each item.
			// context: [optional] Object
			//		Object to which the context of the function call will be set.
			arrayUtil.every(array, function (item, index) {
				if (fn.call(context, item, index, array) === false) {
					return false;
				}

				return true;
			});
		},
		forEachReverse: function (/*Array*/ array, /*Function*/ fn, /*Object?*/ context) {
			// summary:
			//		Functions as forEach but in reverse order.
			// array: Array
			//		Array to iterate through.
			// fn: Function
			//		Function to execute for each item.
			// context: [optional] Object
			//		Object to which the context of the function call will be set.
			var i = array.length;

			while (i--) {
				if (fn.call(context, array[i], i, array) === false) {
					break;
				}
			}
		},
		not: function (/*Array*/ array, /*Object*/ not) {
			// summary:
			//		Return the first item that is not a given object.
			// array: Array
			//		Array to iterate through.
			// not: Object
			//		Object that is not desired.
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
		notReverse: function (/*Array*/ array, /*Object*/ not) {
			// summary:
			//		Functions as not, but in reverse order.
			// array: Array
			//		Array to iterate through.
			// not: Object
			//		Object that is not desired.
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
		}
	};
});