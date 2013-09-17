define([
	"dojo/_base/declare",
	"../util/array",
	"../compat/es5polyfills"
], function (declare, arrayUtil) {
	return declare(null, {
		// summary:
		//		Adds functionality for creating relationships between destroyable or removable objects and this object
		//		where they should all be destroyed together.
		// _owned: Object[]
		//		Items that are owned by this object.
		_owned: null,
		own: function () {
			// summary:
			//		Creates a relationship where this object is the owner of provided items.
			//		Items should have either destroyRecursive, destroy, remove, or dispose method.
			if (!this._owned) {
				this._owned = [];
			}

			this._owned = this._owned.concat(arrayUtil.create(arguments));
		},
		destroy: function () {
			// summary:
			//		Removes all owned items before this object is destroyed.
			var owned = this._owned,
				i = 0,
				peon;

			this._owned.forEach(function (peon) {
				if (peon.destroyRecursive) {
					peon.destroyRecursive();
				} else if (peon.destroy) {
					peon.destroy();
				} else if (peon.remove) {
					peon.remove();
				// knockoutjs
				} else if (peon.dispose) {
					peon.dispose();
				}
			});

			this._owned = [];

			this.inherited(arguments);
		}
	});
});
