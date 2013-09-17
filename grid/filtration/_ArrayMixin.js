define([
	"dojo/_base/declare"
], function (declare) {
	return declare(null, {
		// summary:
		//		Array functionality for when a grid or list does not have a store.
		// _filtering: Boolean
		//		Will be true if the grid is currently being filtered.
		_filtering: false,
		renderArray: function () {
			this.inherited(arguments);

			if (!this._filtering) {
				this._originalCollection = this._lastCollection;
			}
		},
		reset: function () {
			this.clear();

			if (this._originalCollection) {
				this.renderArray(this._originalCollection);
			}
		},
		_resetCollection: function () {
			this._lastCollection = this._originalCollection;
		}
	});
});
