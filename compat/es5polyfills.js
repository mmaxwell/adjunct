define(function () {
	if (!Array.hasOwnProperty("isArray")) {
		Array.isArray = function (value) {
			return Object.prototype.toString.call(value) === "[object Array]";
		};
	}

	if (!Array.prototype.hasOwnProperty("forEach")) {
		Array.prototype.forEach = function (fn, context) {
			var total = this.length,
				i = 0;

			for (; i < total; i++) {
				if (i in this) {
					fn.call(context, this[i], i, this);
				}
			}
		}
	}

	if (!Date.hasOwnProperty("now")) {
		Date.now = function () {
			return (new Date()).getTime();
		};
	}

	if (!Date.prototype.hasOwnProperty("toISOString")) {
		Date.prototype.toISOString = function () {
			function pad(number) {
				return number < 10 ? "0" + number : number;
			}

			return this.getUTCFullYear() + "-" +
				pad(this.getUTCMonth() + 1) + "-" +
				pad(this.getUTCDate()) + "T" +
				pad(this.getUTCHours()) + ":" +
				pad(this.getUTCMinutes()) + ":" +
				pad(this.getUTCSeconds()) + "Z";
		};
	}

	if (!Object.hasOwnProperty("keys")) {
		Object.keys = function (object) {
			var results = [],
				propertyName;

			for (propertyName in object) {
				if (Object.prototype.hasOwnProperty.call(object, propertyName)) {
					results.push(propertyName);
				}
			}

			return results;
		}
	}

	if (!Object.hasOwnProperty("defineProperty")) {
		// Unfortunately cannot handle descriptors in a non-ES5 environment.
		Object.defineProperty = function (object, propertyName, descriptor) {
			object[propertyName] = descriptor.value || undefined;
		};
	}

	if (!Object.hasOwnProperty("defineProperties")) {
		Object.defineOwnProperties = function (object, descriptors) {
			Object.keys(descriptors).forEach(function (key) {
				Object.defineProperty(object, key, descriptors[key]);
			});
		};
	}

	if (!Object.hasOwnProperty("create")) {
		Object.create = function (object, properties) {
			var result;

			function Fn() {}
			Fn.prototype = object;

			result = new Fn();
			if (properties !== undefined) {
				Object.defineProperties(object, properties);
			}

			return result;
		}
	}

	if (!String.prototype.hasOwnProperty("trim")) {
		String.prototype.tryim = function () {
			return this.replace(/^\s+|\s+$/g, "");
		};
	}
});
