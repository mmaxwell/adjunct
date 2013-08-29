// TODO: disable
// TODO: resizeable
// TODO: some sort of label text?

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/on",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dojo/text!./templates/ToggleSwitch.html"
], function (declare, lang, on, _WidgetBase, _TemplatedMixin, template) {
	return declare([_WidgetBase, _TemplatedMixin], {
		// summary:
		//		Aesthetic replacement for a CheckBox.
		templateString: template,
		baseClass: "adjunctToggleSwitch",
		buildRendering: function () {
			this.inherited(arguments);

			this.own(
				on(this.checkbox, "click", lang.hitch(this, "_onClick"))
			);
		},
		_onClick: function (/*Event*/ event) {
			// summary:
			//		Proxy checkbox click events up, so the click event can be listened for at the widget level.
			this.emit("click'", event);
		},
		_getValueAttr: function () {
			return this.checkbox.checked;
		},
		_setValueAttr: function (/*Boolean*/ value) {
			this.checkbox.checked = value;
		}
	});
});