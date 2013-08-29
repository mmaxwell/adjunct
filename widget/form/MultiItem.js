// TODO: Add some better styles/icons
define([
	"require",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/on",
	"dojo/query",
	"dojo/store/Memory",
	"dijit/_Container",
	"dijit/registry",
	"put-selector/put",
	"./_TemplatedMixin",
	"./_IteratorMixin",
	"../../util/typeCheck",
	"dojo/text!./templates/MultiItem.html"
], function (require, declare, lang, domClass, on, query, Memory, _Container, registry, put, _TemplatedMixin, _IteratorMixin, typeCheck, template) {
	return declare([_TemplatedMixin, _Container, _IteratorMixin], {
		// summary:
		//		Item for controlling creating and removing multiple items of a given class.
		baseClass: "multi-item",
		// items: dojo/store/Memory
		//		Contains all items.
		items: null,
		// itemClass: Function
		//		Constructor to be used for adding new items.
		itemClass: null,
		// readonly: Boolean
		//		If the items are readonly.
		readonly: false,
		// disabled: Boolean
		//		If the items are disabled.
		disabled: false,
		widgetsInTemplate: true,
		templateString: template,
		buildRendering: function () {
			this.inherited(arguments);

			this.items = new Memory();

			this.containerNode = this.itemListNode;

			this.own(
				on(this.domNode, ".remove:click", lang.hitch(this, "_onRemoveItem")),
				on(this.addNode, ".add:click", lang.hitch(this, "_onAddNewItem"))
			);

			if (this.readonly || this.disabled) {
				domClass.add(this.addNode, ".dijitHidden");
			}
		},
		postCreate: function () {
			this.inherited(arguments);

			if (!this.readonly && !this.disabled) {
				this._addNewItem();
			}
		},
		_setItemClassAttr: function (/*Function*/ itemClass) {
			// summary:
			//		Set the ItemClass to be used.
			// itemClass: Function
			if (typeCheck.isString(itemClass)) {
				itemClass = require(itemClass);
			}

			this._set("itemClass", itemClass);
		},
		_onAddNewItem: function () {
			// summary:
			//		Handler for when addNode icon is clicked.
			this._addNewItem();
		},
		_addNewItem: function () {
			// summary:
			//		Adds a new item not initialized with any value.  Item readonly and disabled will bet set.
			var item;

			if (this.readonly || this.disabled) {
				return;
			}

			item = new this.itemClass({
				readonly: this.readonly,
				disabled: this.disabled
			});

			this._addChild(item, false);
		},
		_addItem: function (/*Object*/ item, /*Boolean?*/ fromSetValue) {
			// summary:
			//		Adds an already initialized item.  
			// item: Object
			//		Item to add.  Item is passed to the value property of the itemClass constructor.
			//		If itemClass is a widget, this will trigger the widget's _setValueAttr setter.
			// fromSetValue: [optional] Boolean
			//		If this is being called from the _setValueAttr method.
			var child;

			if ((this.readonly || this.disabled) && !fromSetValue) {
				return;
			}

			child = new this.itemClass(lang.mixin({
				readonly: this.readonly,
				disabled: this.disabled
			}, {
				value: item
			}));

			this._addChild(child, fromSetValue);
		},
		_addChild: function (/*Object*/ child, /*Boolean?*/ fromSetValue) {
			// summary:
			//		Add a child using _Container addChild method.
			// child: Object
			//		Child to add.
			// fromSetValue: [optional] Boolean
			//		If this is being called from the _setValueAttr method.
			if ((this.readonly || this.disabled) && !fromSetValue) {
				return;
			}

			this.addChild(child);
			this._addRemoveIcon(child);
			this.items.put(child);
		},
		_addRemoveIcon: function (/*Object*/ item) {
			// summary:
			//		Adds remove icon to item's DOM node.
			// item: Object
			var removeNode = put(item.removeNode || item.domNode, "div.removeNode"),
				removeIcon = put(removeNode, "span.icon.remove");

			if (this.readonly || this.disabled) {
				put(removeIcon, ".dijitHidden");
			}
		},
		_getValueAttr: function () {
			return this.items.query({});
		},
		_hideRemoveNodes: function (add) {
			// summary:
			//		Hides all remove nodes.
			var classMethod;

			classMethod = domClass[add ? 'add' : 'remove'];

			query('.remove', this.domNode).forEach(function (node) {
				classMethod(node, 'dijitHidden');
			});

			classMethod(this.addNode, 'dijitHidden');
		},
		_setDisabledAttr: function (/*Boolean*/ disabled) {
			// summary:
			//		Sets the disabled attribute of all children.
			// disabled: Boolean
			if (this.disabled === disabled) {
				return;
			}

			this._hideRemoveNodes(disabled);

			this.perChild(function (item) {
				item.set("disabled", disabled);
			});

			this._set("disabled", disabled);
		},
		_setReadonlyAttr: function(/*Boolean*/ readonly) {
			// summary:
			//		Sets the readonly attribute of all children.
			// readonly: Boolean
			if (this.readonly === readonly) {
				return;
			}

			this._hideRemoveNodes(readonly);

			this.perChild(function (item) {
				item.set("readonly", readonly);
			});

			this._set("readonly", readonly);
		},
		_onRemoveItem: function (/*Event*/ event) {
			// summary:
			//		Event handle for when the remove node for an item is clicked.
			this._removeItem(registry.getEnclosingWidget(event.target));
		},
		_removeItem: function (/*Object*/ item) {
			// summary:
			//		Removes an item from the list.
			// item: Object
			this.items.remove(item.id);

			item.destroyRecursive();
		},
		_setValueAttr: function (/*Object[]*/ items) {
			// summary:
			//		Clears existing items and adds a new item for every item in the array.
			// items: Object[]
			//		Array of objects that will be passed to item constructors.
			//		Each object is passed as the value of the widgets initialized.
			var i, item;

			if (items) {
				this.perChild(function (item) {
					this._removeItem(item);
				}, this);

				i = 0;
				while (item = items[i++]) {
					this._addItem(item, true);
				}

				this._addNewItem();
			}
		}
	});
});