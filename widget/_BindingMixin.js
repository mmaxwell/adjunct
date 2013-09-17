// TODO: Observable array?
// TODO: Binding on a widget
// TODO: Binding on nested widgets
// TODO: Binding on nested namespaces
define([
	"dojo/_base/declare",
	"dojo/dom-attr",
	"./_OwnMixin",
	"../util/array",
	"knockout/knockout-2.3.0"
], function (declare, domAttr, _OwnMixin, arrayUtil, ko) {
	return declare(_OwnMixin, {
		buildRendering: function () {
			var binder = /(text|value|attr)\:\s*/,
				model = {},
				bindee = this;

			this.inherited(arguments);

			function bind(/*Node*/ node) {
				// summary:
				//		Binds a node to the model.
				// node: Node
				//		Node to bind.
				var binding = domAttr.get(node, "data-bind"),
					key;

				if (binding) {
					key = binding.replace(binder, "");

					if (!model.hasOwnProperty(key)) {
						model[key] = ko.observable(bindee.get(key));

						// Two-way binding:
						// When the model changes, the widget is updated.
						// When the widget changes, the model is updated.
						bindee.own(
							model[key].subscribe(function (newValue) {
								bindee._set(key, newValue);
							}),
							bindee.watch(key, function (property, oldValue, newValue) {
								if (model[property]) {
									model[property](newValue);
								}
							})
						);
					}
				}
			}

			function applyBindings(/*Node*/ node) {
				// summary:
				//		Binds node and all child nodes.
				// node: Node
				//		Root node.
				var children = node.childNodes ? arrayUtil.create(node.childNodes) : null;

				bind(node);

				if (children) {
					children.forEach(applyBindings);
				}
			}

			applyBindings(this.domNode);
			ko.applyBindings(model, this.domNode);
		}
	});
});
