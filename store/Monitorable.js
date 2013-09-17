define([
	"dojo/_base/lang",
	"dojo/when",
	"dojo/store/Memory",
	"../compat/es5polyfills"
], function (lang, when, Memory) {
	return function (/*dojo/store*/ store) {
		// summary:
		//		Wraps a store instance to allow monitoring changes to a specific value.
		// store: dojo/store
		//		Store to wrap.
		var data = store.data,
			// Internal cache of current data.  Used to grab old data.
			cache = new Memory({
				idProperty: store.idProperty,
				data: data && lang.clone(data) || []
			}),
			originals = {
				put: store.put,
				setData: store.setData,
				query: store.query,
				get: store.get,
				add: store.add,
				remove: store.remove
			},
			listeners = {};

		store.put = function (/*Object*/ object, /*Object?*/ directives) {
			// summary:
			//		Puts an object into both cache store and wrapped store.
			// object: Object
			//		Object to put into the store.
			// directives: [optional] Object
			//		Directives for the stores' put calls.
			var old = cache.get(cache.getIdentity(object)),
				i, total, property, oldValue, newValue, listener;

			Object.keys(listeners).forEach(function (property) {
				listener = listeners[property];
				if (listener) {
					oldValue = old[property];
					newValue = object[property];

					if (old && oldValue !== newValue) {
						listener.call(object, oldValue, newValue);
					}
				}
			});

			cache.put.call(cache, lang.clone(object), directives);
			return originals.put.call(this, object, directives);
		};

		store.add = function (/*Object*/ object, /*Object?*/ directives) {
			// summary:
			//		Creates an object, throws an error if the object already exists.
			// object: Object
			//		Object to put into the store.
			// directives: [optional] Object
			//		Directives for the store's put call.
			(directives = directives || {}).overwrite = false;
			return this.put(object, directives);
		};

		// store.queryEngine exists if the store is a dojo/store/Memory
		if (!store.queryEngine) {
			store.query = function (/*Object*/ query, /*Object?*/ options) {
				// summary:
				//		Queries the store for data.
				//		Will store data retrieved in the cache.
				// query: Object
				//		Query to run against the store.
				// options: [optional] Object
				//		Options used by original store's query.
				var results = originals.query.call(store, query, options);

				results.forEach(function (object) {
					cache.put(lang.clone(object));
				});

				return results;
			};

			store.get = function (/*String|Number*/ id, /*Object?*/ directives) {
				// summary:
				//		Gets an item from the store.
				// id: String|Number
				//		Id of the item to retrieve.
				// directives: [optional] Object
				//		Directives for the original store's get call.
				return when(originals.get.call(this, id, directives), function (result) {
					if (result) {
						cache.put(lang.clone(result));
					}

					return result;
				});
			};
		}

		store.setData = function (/*Object[]*/ data) {
			// summary:
			//		Sets the data in the store to the data provided.
			//		Will also set the data for the cache.
			// data: Object[]
			//		Array of objects to add as the data to the stores.
			var copyData = data && lang.clone(data) || [];
			cache.setData(copyData);
			originals.setData.call(store, data);
		};

		store.remove = function (/*String|Number*/ id, /*Object?*/ directives) {
			// summary:
			//		Removes an object from the store and its cache.
			// id: String|Number
			//		Id of the item to remove.
			// directives: Object
			//		Optional Directives for the stores' remove calls.
			return when(originals.remove.call(store, id, directives), function () {
				return cache.remove.call(cache, id, directives);
			});
		};

		store.monitor = function (/*String*/ property, /*Function*/ listener) {
			// summary:
			//		Add a listener to a specific property.
			//		If a listener already exists for that
			//		property, it is replaced outright.
			// property: String
			//		Property to listen for changes on.
			// listener: Function
			//		Function to execute when a change is detected on the provided property.
			//		The function is executed with the object being put as the scope of the callback.
			if (listeners[property] !== undefined) {
				listeners[property] = undefined;
			}

			listeners[property] = listener;

			return {
				remove: function () {
					listeners[property] = undefined;
				}
			};
		};

		return store;
	};
});
