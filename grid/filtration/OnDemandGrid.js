define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/Deferred",
	"dojo/on",
	"dojo/when",
	"dgrid/OnDemandGrid",
	"./_GridMixin",
	"./util"
], function (declare, lang, Deferred, on, when, OnDemandGrid, _GridMixin, util) {
	return declare([OnDemandGrid, _GridMixin], {
		// summary:
		//		Grid with the ability to filter on a per column basis that is able to use a dojo/store/* store.
		filter: function (/*Object?*/ fields) {
			// summary:
			//		Filters the grid based on values of all filters.
			// fields: Object?
			//		Optional object containing field and value. 
			//	|	grid.filter({col1: "value", col3: "other value"});
			var filterers = this._filterers,
				i = 0,
				query = {},
				filterer, value, field;

			if (util.isObject(fields)) {
				for (field in fields) {
					this._filtererMap[field].setValue(fields[field]);
				}

				return this.filter();
			}
			
			while (filterer = filterers[i++]) {
				value = filterer.getValue();
				if (value !== "") {
					lang.mixin(query, filterer.buildQuery(value, filterer.field));
				}
			}

			this.set("query", query);

			on.emit(this.domNode, "filtration-filter-complete", {
				bubbles: true,
				cancelable: true
			});
		},
		reset: function () {
			this.filter();
		}
	});
});