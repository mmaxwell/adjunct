define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"../../widget/_OwnMixin"
], function (declare, lang, _OwnMixin) {
	return declare(_OwnMixin, {
		// summary:
		//		Abstract mixin for adding basic filtration functionality.
		_attachEventListeners: function (/*Evented*/ filterer) {
			// summary:
			//		Adds filter and reset event listeners to a filterer.
			// filterer: Evented
			this.own(
				filterer.on("filtration-filter", lang.hitch(this, "_onFilter")),
				filterer.on("filtration-reset", lang.hitch(this, "_onReset"))
			);
		},
		_onFilter: function (/*Event*/ event) {
			this.filter(event.value);
		},
		_onReset: function (/*Event*/ event) {
			this.reset(event);
		},
		clear: function () {
			// summary:
			//		Clears the grid/list of its contents.
			this.cleanup();
			this.contentNode.innerHTML = "";
		},
		reset: function () {},
		filter: function (value) {}
	});
});