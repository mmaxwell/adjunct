define([
	"dojo/_base/declare",
	"./_FiltrationMixin",
	"../../util/array"
], function (declare, _FiltrationMixin, arrayUtil) {
	return declare(_FiltrationMixin, {
		// summary:
		//		Abstract class containing common grid functionality.
		// _filterers: filterer[]
		_filterers: null,
		// _filtererMap: Object
		//		Map containing filterers where the field they are tied to is the key.
		_filtererMap: null,
		renderHeader: function () {
			var columns, filterers, filterMap;

			this.inherited(arguments);

			columns = this.columns;

			filterers = this._filterers;
			filterMap = this._filterMap;

			if (!filterers) {
				this._filterers = filterers = [];
				this._filtererMap = filtererMap = {};
			}

			Object.keys(columns).forEach(function (columnId) {
				var column = columns[columnId];

				this.own(column);
				this._attachEventListeners(column);
				filterers.push(column);
				filtererMap[column.field] = column;

				column.headerNode.appendChild(column.domNode);
			}, this);
		},
		_setFiltererValues: function (/*Object*/ fields) {
			// summary:
			//		Sets the values of all the filterers.
			// fields: Object
			//		Object containing filterer name and value.
			Object.keys(fields).forEach(function (field) {
				this._filtererMap[field].setValue(fields[field]);
			}, this);

			this.filter();
		}
	})
});