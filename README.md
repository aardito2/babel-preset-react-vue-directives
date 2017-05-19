# babel-preset-react-vue-directives

Enables the usage of Vue<span></span>.js directives in React.

Refer to the [Vue.js docs](https://vuejs.org/v2/api/#Directives) for more information on directives.

# Table of Contents:
* [Installation](#installation)
* [Usage](#usage)
* [Changes from Vue<span></span>.js directives](#changes-from-vue.js-directives)
* [String literals vs expressions](#string-literals-vs-expressions)
* [Supported directives](#supported-directives)
* [Examples](#examples)
* [`vFor`](#vfor)
* [`vIf`](#vif)
* [`vShow`](#vshow)
* [`vModel`](#vmodel)
* [`vOn`](#von)

## Installation

```sh
$ npm install babel-preset-react-vue-directives
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["react-vue-directives", "react"]
}
```

### Via CLI

```sh
$ babel --presets react-vue-directives,react script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["react-vue-directives", "react"]
});
```

## Changes from Vue<span></span>.js directives:

Please note the following differences from Vue<span></span>.js:

* All directives use camelCase instead of kebab-case.
* Directive modifiers use `$` as a separator rather than `:` and `.`.
* `vOn` only supports named functions.
* `vOn` does not support the `self` and `once` event modifiers.
* `vModel` supports binding to nested properties on state - see [below](#vmodel) for an example.

## String literals vs expressions

* `vFor` only supports string literals in the formats described [below](#vfor).
* `vIf` and `vShow` support both curly brace expressions and string literals. String literals can only contain identifiers.
* `vModel` and `vOn` only support string literals containing an identifier. For `vModel`, this should be the name of a top-level property on `this.state`; for `vOn` it should be the name of an in-scope function.

### Supported directives:
* `vFor`
* `vIf`
* `vElseIf`
* `vElse`
* `vShow`
* `vModel`
* `vOn`

## Examples

### `vFor`

Since this preset transforms `vFor` into a `.map` call, a `key` property is required for the element. 
For arrays, if you do not provide a key, the array index will be used. For objects, the object's keys are used automatically.

As in Vue<span></span>.js, the following forms are supported:

#### [Arrays](https://vuejs.org/v2/guide/list.html#Basic-Usage):
* `element in arr`
* `element of arr`
* `(element, index) in arr`
* `(element, index) of arr`

##### Example:

```js
<ul>
	<li vFor="item of items">{item}</li>
</ul>
```

With key explicitly provided:

```js
<ul>
	<li vFor="item of items" key={item.id}>{item}</li>
</ul>
```

#### [Objects](https://vuejs.org/v2/guide/list.html#Object-v-for):
* `value in obj`
* `value of obj`
* `(value, key) in obj`
* `(value, key) of obj`
* `(value, key, index) in obj`
* `(value, key, index) of obj`

Please note that `of` and `in` are functionally identical and do not follow the behavior of their JavaScript equivalents.

As in Vue<span></span>.js, when using custom React elements, you will need to explicitly define values for the props generated by `vFor`, with the exception of `key`, which will automatically be provided to each element.

##### Example:

```js
<MyComponent
	vFor="(value, key, index) in obj"
	value={value}
	index={value} />
```

<hr style="border: none; height: 2px;"/>

### [`vIf`](https://vuejs.org/v2/guide/conditional.html#v-if)

Conditionally render components based on a condition.

As noted [above](#string-literals-vs-expressions), `vIf` accepts both curly brace expressions and string literals. String literals can only contain identifiers.

#### Example:

```js
<div>
	<div vIf="condition">
		Displays if condition is true
	</div>
	<div vElseIf={value > 5}>
		Displays if value > 5
	</div>
	<div vElse>
		Displays if neither of the previous conditions is true
	</div>
<div>
```

<hr style="border: none; height: 2px;"/>

### [`vShow`](https://vuejs.org/v2/guide/conditional.html#v-show)

#### Example:

Sets the `display` property of the element to `none` if the condition is false.

As with `vIf`, `vShow` accepts both curly brace expressions and string literals. String literals can only contain identifiers.

If the element already has a `display` property, it will be used when the condition is true.

```js
<div vShow="condition">Shows when condition is true</div>
```

```js
<div vShow="condition" style={{display: 'block'}}>
	Has display: none when the condition is false, display: block when it is true
</div>
```

<hr style="border: none; height: 2px;"/>

### [`vModel`](https://vuejs.org/v2/guide/forms.html)

Creates a two-way binding between a property on `this.state` and the value of a form element. `vModel` can be used on `<input>`, `<textarea>`, and `<select>` elements.

#### Example:

```js
<input vModel="inputValue" />
```

The `<input />` element will become a controlled element, with its value linked to `this.state.inputValue`. When the input changes, `this.setState({ inputValue: event.target.value })` will be called.

`vModel` also supports binding to nested properties on `this.state`:

```js
import React, { Component } from 'react';

export default class NestedStateComponent extends component {
	state = {
		a: {
			b: {
				c: {
					inputValue: ''
				}
			}
		}
	};

	render() {
		return (
			<input vModel="a.b.c.inputValue" />
		);
	}
}
```

The output code will use `Object.assign` as needed when calling `this.setState` to update the bound property.

`vModel` supports the `lazy`, `trim`, and `number` modifiers. As with `vOn`, `$` should be used as a separator rather than `.`:

```js
<input vModel$lazy$trim$number="value" />
```

<hr style="border: none; height: 2px;"/>

### [`vOn`](https://vuejs.org/v2/guide/events.html)

Adds event handlers. 

Since `:` and `.` cannot be used in JSX attribute names, `$` must be substituted for both.

For key modifiers, the separator should be omitted:

> **Vue<span></span>.js:**
```html
<input v-on:keyup.13.prevent="submit" />
```

> **babel-preset-react-vue-directives:**
```js
<input vOn$keyup13$prevent="submit" />
```

As noted above, the value of the `vOn` attribute *must* be the name of a function. The following example from the Vue<span></span>.js docs **will not** work:

```js
<button v-on$click="counter += 1">
	Add 1
</button>
```

You must pass the name of a function, which will be called with the triggered `event`.

```js
import React, { Component } from 'react';
export default class Counter extends Component {
	state = {
		counter: 0
	};
	
	increment = event => this.setState({ counter: this.state.counter + 1});
	
	render() {
		return (
			<button vOn$click="increment">Increment</button>
		);
	}
}
```

