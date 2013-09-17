define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/store/util/SimpleQueryEngine",
	"dijit/form/TextBox",
	"dgrid/util/misc",
	"./_FilterMixin"
], function (declare, lang, SimpleQueryEngine, TextBox, misc, _FilterMixin) {
	function createRegExp(/*String*/ value, /*Boolean*/ caseSensitive) {
		// summary:
		//		Creates a regular expression to match a provided value.
		// value: String
		//		Value to match against.
		// caseSensitive: Boolean
		//		Whether the regular expression should be case sensitive or not.
		return new RegExp(value, caseSensitive ? "" : "i")
	}

	return declare(_FilterMixin, {
		// summary:
		//		A text box filter that allows case insensitive queries to be built.
		// filterTimeout: Number
		//		Time in milliseconds between keypresses before a filter event should fire.
		//		Only referenced if filterImmediately is true.
		filterTimeout: 250,
		// minLength: Number
		//		The minimum number of characters the criteria can be before a filter event should fire.
		minLength: 2,
		// caseSensitive: Boolean
		//		Whether the query sould be case sensitive.
		//		Only referenced if canRegExp is true.
		caseSensitive: false,
		// filterImmediately: Boolean
		//		Whether or not the filtering should happen as the user types.
		filterImmediately: true,
		// canRegExp: Boolean
		//		Whether or not regular expressions are supported with matching data.
		canRegExp: false,
		constructor: function (options) {
			lang.mixin(this, options);
		},
		init: function () {
			// summary:
			//		Initializes this widget.
			var domNode, criteria;

			if (this.initialized) {
				return;
			}

			domNode = this.domNode = document.createElement("div");
			criteria = this.criteria = new TextBox({
				intermediateChanges: this.filterImmediately
			}).placeAt(domNode);

			this.own(
				criteria,
				criteria.watch("value", misc.debounce(function (attribute, oldValue, newValue) {
					if (newValue.length >= this.minLength) {
						this.emit("filtration-filter", {
							value: newValue
						});
					} else {
						this.emit("filtration-reset", {
							filterer: this
						});
					}
				}, this, this.filterTimeout)),
				criteria.on("click", function (event) {
					event.stopPropagation();
				})
			);

			this.canRegExp = this.grid.store ? this.grid.store.queryEngine === SimpleQueryEngine : true;
			this.initialized = true;
		},
		checkValue: function (/*String*/ value, /*String*/ expectedValue) {
			// summary:
			//		Checks a value against an expected value.
			// returns:
			//		Boolean that will be true if value is acceptable.
			return createRegExp(expectedValue, this.caseSensitive).test(value);
		},
		buildQueries: function (/*String*/ value, /*String[]*/ properties) {
			// summary:
			//		Build queries based on a set of properties and a value.
			// value: String
			//		Value to be referenced.
			// properties: String[]
			//		Properties that will be checked.
			// returns:
			//		Array of query objects.
			var	queries = [];

			properties.forEach(function (property) {
				queries.push(this.buildQuery(value, property));
			}, this);

			return queries;
		},
		buildQuery: function (/*String*/ value, /*String*/ property) {
			// summary:
			//		Build a query object for a property and a given value.
			// value: String
			//		Value to check.
			// property: String
			//		Property to check value against.
			// returns:
			//		A query object.
			var query = {},
				trimmedValue = value.trim();

			if (trimmedValue) { 
				query[property] = this.canRegExp ? createRegExp(trimmedValue, this.caseSensitive) : property;
			}

			return query;
		},
		getValue: function () {
			// returns:
			//		The value of the filter.
			return this.criteria.get("value");
		},
		getStrictValue: function () {
			// returns:
			//		The value only if its length is equal to or greater than minLength, otherwise null.
			var value = this.getValue();

			if (value.length >= this.minLength) {
				return value;
			}

			return null;
		},
		setValue: function (/*String*/ value) {
			// summary:
			//		Sets the value of the filter.
			// value: String
			//		The value to which the filter will be set.
			this.criteria.set("value", value);
		}
	});
});
