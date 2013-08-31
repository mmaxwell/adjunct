# Dependencies

* Dojo
* Dijit
* dgrid
* xstyle

# Examples

## adjunct/store/Monitorable

<pre><code>
require([
	"dojo/store/Memory",
	"adjunct/store/Monitorable"
], function (Memory, Monitorable) {
	var store = new Monitorable(new Memory({
		data: [{id: "foo", name: "Foo"}, {id: "bar", name: "Bar"}, {id: "baz", name: "Baz"}]
	}));

	store.monitor("name", function (oldValue, newValue) {
		console.log("name changed from", oldValue, "to", newValue);
	});

	var old = store.get("foo");
	old.name = "Qux";
	store.put(old);
});
</code></pre>

## adjunct/widget/ToggleSwitch

<pre><code>
&lt;input type=&quot;checkbox&quot; id=&quot;toggleSwitch&quot; /&gt; Foo
</code></pre>

<pre><code>
require([
	"adjunct/widget/form/ToggleSwitch"
], function (ToggleSwitch) {
	var toggleSwitch = new ToggleSwitch({}, "toggleSwitch");

	toggleSwitch.startup();

	toggleSwitch.on("click'", function (event) {
		console.log("Clicked!", event);
	});
});
</code></pre>

## adjunct/widget/form/MultiItem

<pre><code>
&lt;div id=&quot;items&quot;&gt;&lt;/div&gt;
</code></pre>

<pre><code>
require([
	"dojo/_base/declare",
	"adjunct/widget/form/_TemplatedMixin",
	"adjunct/widget/form/MultiItem"
], function (declare, _TemplatedMixin, MultiItem) {
	var TestItem = declare(_TemplatedMixin, {
		templateString: "&lt;div&gt;&lt;input type='text' data-dojo-attach-point='inputNode' /&gt;&lt;/div&gt;",
		_setValueAttr: function (value) {
			this.inputNode.value = value.value;
		},
		_setDisabledAttr: function (disabled) {
			if (this.disabled === disabled) {
				return;
			}

			this.inputNode[disabled ? "setAttribute" : "removeAttribute"]("disabled", disabled);
			this._set("disabled", disabled);
		},
		_setReadonlyAttr: function (readonly) {
			if (this.readonly === readonly) {
				return;
			}

			this.inputNode[readonly ? "setAttribute" : "removeAttribute"]("readonly", readonly);
			this._set("readonly", readonly);
		}
	});

	window.items = new MultiItem({
		itemClass: TestItem,
		addItemMessage: "Add New Test Item"
	}, "items");

	items.startup();

	items.set("value", [{
		value: "testing"
	}]);
});
</code></pre>

## adjunct/widget/pausable

<pre><code>
Currently &lt;span id=&quot;state&quot;&gt;Unpaused&lt;/span&gt;
&lt;button type=&quot;button&quot; id=&quot;toggleButton&quot;&gt;Toggle&lt;/button&gt;
</code></pre>

<pre><code>
require([
	"dojo/on",
	"dijit/form/Button",
	"adjunct/widget/pauseable",
], function (on, Button, pausable) {
	var button = new Button({
		label: "Pasuable"
	});

	var handle = button.on(pausable("click"), function() {
		console.log("Button was clicked");
	});

	var state = document.getElementById("state");

	button.placeAt(document.body);

	on(document.getElementById("toggleButton"), "click", function () {
		if (handle.isPaused()) {
			handle.resume();
			state.innerHTML = "Unpaused";
		} else {
			handle.pause();
			state.innerHTML = "Paused";
		}
	});
});
</code></pre>

## adjunct/grid/filtration/List

<pre><code>
&lt;div id=&quot;list&quot;&gt;&lt;/div&gt;
</code></pre>

<pre><code>
require([
	"adjunct/grid/filtration/List",
	"adjunct/grid/filtration/filters/TextBox",
	"dgrid/test/data/base"
], function (List, TextBox) {
	var list = new List({
		filterProperties: ["col1", "col3"],
		filterer: new TextBox({
			label: "Filter"
		}),
		renderRow: function (object) {
			var row = document.createElement("div");

			row.innerHTML = object.col1 + " - " + object.col3;

			return row;
		}
	}, "list");

	list.renderArray(data_list);
});
</code></pre>

## adjunct/grid/filtration/OnDemandList

<pre><code>
&lt;div id=&quot;list&quot;&gt;&lt;/div&gt;
</code></pre>

<pre><code>
require([
	"adjunct/grid/filtration/OnDemandList",
	"adjunct/grid/filtration/filters/TextBox",
	"dgrid/test/data/base"
], function (OnDemandList, TextBox) {
	var list = new OnDemandList({
		store: testStore,
		filterProperties: ["col1", "col3"],
		filterer: new TextBox({
			label: "Filter"
		}),
		renderRow: function (object) {
			var row = document.createElement("div");

			row.innerHTML = object.col1 + " - " + object.col3;

			return row;
		}
	}, "list");
});
</code></pre>

## adjunct/grid/filtration/Grid

<pre><code>
&lt;div id=&quot;grid&quot;&gt;&lt;/div&gt;
</code></pre>

<pre><code>
require([
	"adjunct/grid/filtration/Grid",
	"adjunct/grid/filtration/filters/TextBox",
	"dgrid/test/data/base"
], function (Grid, TextBox) {
	var grid = new Grid({
		columns: [
			new TextBox({
				label: "Column 1",
				field: "col1"
			}),
			new TextBox({
				label: "Column 3",
				field: "col3"
			})
		]
	}, "grid");

	grid.renderArray(data_list);
});
</code></pre>

## adjunct/grid/filtration/OnDemandGrid

<pre><code>
&lt;div id=&quot;grid&quot;&gt;&lt;/div&gt;
</code></pre>

<pre><code>
require([
	"adjunct/grid/filtration/OnDemandGrid",
	"adjunct/grid/filtration/filters/TextBox",
	"dgrid/test/data/base"
], function (OnDemandGrid, TextBox) {
	var grid = new OnDemandGrid({
		store: testStore,
		columns: [
			new TextBox({
				label: "Column 1",
				field: "col1"
			}),
			new TextBox({
				label: "Column 3",
				field: "col3"
			})
		]
	}, "grid");
});
</code></pre>