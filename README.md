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