define([
	"dojo/_base/declare",
	"../../../widget/_OwnMixin",
	"dojo/Evented"
], function (declare, _OwnMixin, Evented) {
	return declare([_OwnMixin, Evented], {
		// summary:
		//		Abstract mixin for custom filters.
		// initialized: Boolean
		initialized: false,
		checkValue: function () {
			// returns:
			//		Boolean that will be true if value is acceptable.
			return false;
		},
		buildQueries: function () {
			// returns:
			//		Array of query objects.
			return [{}];
		},
		buildQuery: function () {
			// returns:
			//		A query object.
			return {};
		},
		getValue: function() {
			// returns:
			//		The value of the filter.
			return null;
		},
		getStrictValue: function () {
			// returns:
			//		The value only if it matches specific criteria, otherwise null.
			return null;
		},
		setValue: function(value) {
			// summary:
			//		Sets the value of the filter.
		},
		init: function () {
			// summary:
			//		Used to initialize the widget.
		}
	});
});