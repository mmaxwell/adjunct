define([
	"dojo/_base/declare"
], function (declare) {
	return declare(null, {
		// summary:
		//		Adds functionality for creating relationships between destroyable or removable objects and this object
		//		where they should all be destroyed together.
		// _owned: Object[]
		//		Items that are owned by this object.
		_owned: [],
		own: function () {
			this._owned = this._owned.concat(Array.prototype.slice.call(arguments, 0));
		},
		destroy: function () {
			var owned = this._owned,
				i = 0,
				peon;

			while (peon = owned[i++]) {
				if (peon.destroyRecursive) {
					peon.destroyRecursive();
				} else if (peon.destroy) {
					peon.destroy();
				} else if (peon.remove) {
					peon.remove();
				}
			}

			this.inherited();
		}
	});
});