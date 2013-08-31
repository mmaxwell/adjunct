define([
	"dojo/_base/declare",
	"dojo/on",
	"dgrid/Grid",
	"./_ArrayMixin",
	"./_GridMixin",
	"../../util/typeCheck",
	"../../util/array"
], function (declare, on, Grid, _ArrayMixin, _GridMixin, typeCheck, arrayUtil) {
	return declare([Grid, _GridMixin, _ArrayMixin], {
		// summary:
		//		Grid with the ability to filter on a per column basis.
		filter: function (/*Object?*/ fields) {
			// summary:
			//		Filters the grid based on values of all filters.
			// fields: [optional] Object
			//		Object containing field and value. 
			//	|	grid.filter({col1: "value", col3: "other value"});
			var filterers = this._filterers,
				results = [],
				result, value;

			this._resetCollection();

			if (typeCheck.isObject(fields)) {
				return this._setFiltererValues(fields);
			}

			this._lastCollection.forEach(function (item) {
				result = true;

				arrayUtil.forEach(filterers, function (filterer) {
					var value = filterer.getStrictValue();

					if (value) {
						result = filterer.checkValue(item[filterer.field], value);
					}

					return result;
				});

				if (result) {
					results.push(item);
				}
			});

			this._filtering = true;
			this.clear();
			this.renderArray(results);
			this._filtering = false;

			on.emit(this.domNode, "filtration-filter-complete", {
				bubbles: true,
				cancelable: true
			});
		},
		reset: function () {
			this._resetCollection();
			this.filter();
		}
	});
});