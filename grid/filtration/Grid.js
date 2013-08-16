define([
	"dojo/_base/declare",
	"dojo/on",
	"dgrid/Grid",
	"./_ArrayMixin",
	"./_GridMixin",
	"./util"
], function (declare, on, Grid, _ArrayMixin, _GridMixin, util) {
	return declare([Grid, _GridMixin, _ArrayMixin], {
		// summary:
		//		Grid with the ability to filter on a per column basis.
		filter: function (/*Object?*/ fields) {
			// summary:
			//		Filters the grid based on values of all filters.
			// fields: Object?
			//		Optional object containing field and value. 
			//	|	grid.filter({col1: "value", col3: "other value"});
			var filterers = this._filterers,
				i = 0,
				collection = this._lastCollection,
				results = [],
				properties = [],
				filterer, item, z, scan, value;

			if (util.isObject(fields)) {
				for (field in fields) {
					this._filtererMap[field].setValue(fields[field]);
				}

				return this.filter();
			}

			while (item = collection[i++]) {
				z = 0;
				scan = true;
				while (scan && (filterer = filterers[z++])) {
					value = filterer.getValue();
					if (value) {
						scan = filterer.checkValue(item[filterer.field], value);
					}
				}

				if (scan) {
					results.push(item);
				}
			}

			this._filtering = true;
			this.clear();
			this.renderArray(results);
			this._filtering = false;

			on.emit(this.domNode, "filtration-filter-complete", {
				bubbles: true,
				cancelable: true
			});
		},
		reset: function (event) {
			this._lastCollection = this._originalCollection;
			this.filter(this._getActiveFilter(event.filterer).getValue());
		}
	});
});