define([
	"dojo/_base/declare",
	"dojo/on",
	"dgrid/List",
	"./_ListMixin",
	"./_ArrayMixin",
	"./util"
], function (declare, on, List, _ListMixin, _ArrayMixin, util) {
	return declare([List, _ListMixin, _ArrayMixin], {
		// summary:
		//		List with the ability to be filtered.
		filter: function (/*Object*/ value) {
			// summary:
			//		Filters the list based on values of its filter.
			// value: Object
			//		Object containing value for which to filter.
			//	|	list.filter("some value");
			var collection = this._lastCollection,
				filterProperties = this.filterProperties,
				total = filterProperties.length,
				i = 0,
				results = [],
				filterer = this.filterer,
				item, z, property;

			while (item = collection[i++]) {
				z = 0;

				while (property = filterProperties[z++]) {
					if (filterer.checkValue(item[property], value)) {
						results.push(item);
					}
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
		}
	});
});