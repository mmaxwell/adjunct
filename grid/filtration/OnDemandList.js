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
		filter: function (/*any*/ value) {
			// summary:
			//		Filters the list based on values of its filter.
			// value: any
			//		Value for which to filter.
			//	|	list.filter("some value");
			var queries = this.filterer.buildQueries(value, this.filterProperties),
				dfd = new Deferred(),
				checkQuery = lang.hitch(this, function (query) {
					if (!dfd.isResolved()) {
						when(this.store.query(query), function (results) {
							if (results.length && !dfd.isResolved()) {
								dfd.resolve(query);
							}
						});
					}
				});

			this.clear();

			queries.forEach(function (query) {
				checkQuery(query);
			});

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