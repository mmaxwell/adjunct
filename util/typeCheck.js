define(function () {
	var toString = Object.prototype.toString;

	return {
		isString: function (object) {
			return toString.call(object) === "[object String]";
		},
		isArray: function (object) {
			return toString.call(object) === "[object Array]";
		},
		isObject: function (object) {
			return toString.call(object) === "[object Object]";
		},
		isFunction: function (object) {
			return toString.call(object) === "[object Function]";
		}
	};
});