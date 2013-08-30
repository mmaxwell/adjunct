define([
	"dojo/_base/declare",
	"./_FiltrationMixin",
	"../../widget/_OwnMixin"
], function (declare, _FiltrationMixin, _OwnMixin) {
	return declare([_FiltrationMixin, _OwnMixin], {
		// summary:
		//		Abstract class for Lists.
		// showHeader: Boolean
		//		If the header should be shown.
		showHeader: true,
		buildRendering: function () {
			var header = document.createElement("div"),
				filterer = this.filterer;

			this.inherited(arguments);

			filterer.grid = this;
			filterer.init();

			if (filterer.label) {
				header.appendChild(document.createTextNode(filterer.label));
			}

			header.appendChild(filterer.domNode);

			this.own(filterer)
			this._attachEventListeners(filterer);

			this.headerNode.appendChild(header);
		}
	});
});