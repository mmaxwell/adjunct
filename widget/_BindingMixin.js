/*
<div id="container">
	<label data-bind="text: nameLabel" data-dojo-attach-point="nameLabelNode"></label>: <input type="text" data-dojo-attach-point="name" data-bind="value: name" />
</div>
*/

define([
	"dojo/_base/declare",
	"dojo/dom-attr",
	"./_OwnMixin",
	"../util/array",
	"knockout/knockout-2.3.0"
], function (declare, domAttr, _OwnMixin, arrayUtil, ko) {
	return declare(_OwnMixin, {
		buildRendering: function () {
			var binder = /(text|value|attr)\:\s/,
				model = {},
				bindee = this;

			this.inherited(arguments);

			function updateModel(property, oldValue, newValue) {
				if (model[property]) {
					model[property](newValue);
				}
			}

			function bind(node) {
				var binding = domAttr.get(node, "data-bind"),
					key;

				if (binding) {
					key = binding.replace(binder, "");

					if (!model.hasOwnProperty(key)) {
						model[key] = ko.observable(bindee.get(key));
						bindee.own(
							model[key].subscribe(function (newValue) {
								bindee._set(key, newValue);
							}),
							bindee.watch(key, updateModel)
						);
					}
				}
			}

			function walkNode(node) {
				var children = node.childNodes ? arrayUtil.create(node.childNodes) : null;

				bind(node);

				if (children) {
					children.forEach(walkNode);
				}
			}

			walkNode(this.domNode);
			ko.applyBindings(model, this.domNode);
		}
	});
});