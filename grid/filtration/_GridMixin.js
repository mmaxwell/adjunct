define([
	"dojo/_base/declare",
	"./_FiltrationMixin"
], function (declare, _FiltrationMixin) {
	return declare(_FiltrationMixin, {
		// summary:
		//		Abstract class containing common grid functionality.
		// _filterers: filterer[]
		_filterers: [],
		// _filtererMap: Object
		//		Map containing filterers where the field they are tied to is the key.
		_filtererMap: {},
		_getActiveFilter: function (/*filterer*/ not) {
			// summary:
			//		Returns a filterer that is not the provided filterer.
			var filterers = this._filterers,
				i = 0,
				filterer;

			while (filterer = filterers[i++]) {
				if (filterer.field !== not.field) {
					return filterer;
				}
			}
		},
		renderHeader: function () {
			var columns, columnId, column;

			this.inherited(arguments);

			columns = this.columns;

			for (columnId in columns) {
				column = columns[columnId];

				this.own(column);
				this._attachEventListeners(column);
				this._filterers.push(column);
				this._filtererMap[column.field] = column;

				column.headerNode.appendChild(column.domNode);
			}
		}
	})
});