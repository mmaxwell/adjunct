define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/Deferred",
	"dojo/on",
	"dojo/when",
	"dgrid/OnDemandList",
	"./_ListMixin"
], function (declare, lang, Deferred, on, when, OnDemandList, _ListMixin) {
	return declare([OnDemandList, _ListMixin], {
		// summary:
		//		List with the ability to be filtered that is able to use a dojo/store/* store.
		reset: function () {
			this.set("query", {});
		},
		filter: function (value) {
			// summary:
			//		Filters the list based on values of its filter.
			// value: Object
			//		Object containing value for which to filter.
			//	|	list.filter("some value");
			var queries = this.filterer.buildQueries(value, this.filterProperties),
				i = 0,
				dfd = new Deferred(),
				list = this,
				query;

			function checkQuery(query) {
				if (!dfd.isResolved()) {
					when(list.store.query(query), function (results) {
						if (results.length && !dfd.isResolved()) {
							dfd.resolve(query);
						}
					});
				}
			}

			this.clear();

			while (query = queries[i++]) {
				checkQuery(query);
			}

			when(dfd, lang.hitch(this, function (query) {
				this.set("query", query);
				on.emit(this.domNode, "filtration-filter-complete", {
					bubbles: true,
					cancelable: true
				});
			}));
		}
	});
});