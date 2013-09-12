define([
	"dojo/_base/declare",
	"dojo/on",
	"dgrid/List",
	"./_ListMixin",
	"./_ArrayMixin"
], function (declare, on, List, _ListMixin, _ArrayMixin) {
	return declare([List, _ListMixin, _ArrayMixin], {
		// summary:
		//		List with the ability to be filtered.
		filter: function (/*any*/ value) {
			// summary:
			//		Filters the list based on values of its filter.
			// value: any
			//		Value for which to filter.
			//	|	list.filter("some value");
			var 	filterProperties = this.filterProperties,
				results = [],
				filterer = this.filterer;

			this._resetCollection();

			this._lastCollection.forEach(function (item) {
				filterProperties.forEach(function (property) {
					if (filterer.checkValue(item[property], value)) {
						results.push(item);
					}
				});
			});

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