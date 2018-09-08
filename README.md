simple-virtual-dom
==============================
[![build](https://circleci.com/gh/livoras/simple-virtual-dom/tree/master.png?style=shield)](https://circleci.com/gh/livoras/simple-virtual-dom) 
[![codecov.io](https://codecov.io/github/livoras/simple-virtual-dom/coverage.svg?branch=master)](https://codecov.io/github/livoras/simple-virtual-dom?branch=master) 
[![Dependency Status](https://david-dm.org/livoras/simple-virtual-dom.svg)](https://david-dm.org/livoras/simple-virtual-dom)
[![npm version](https://badge.fury.io/js/simple-virtual-dom.svg)](https://badge.fury.io/js/simple-virtual-dom) 

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Simple virtual-dom algorithm. It has only ~500 lines of code, including very basic idea of virtual-dom algorithm.

**NOTE**: This is an experiment library, DO NOT use it in any serious productions.

## Install

npm:

    $ npm install simple-virtual-dom --save

or checkout the `bundle.js` in `dist`:

    <script src="simple-virtual-dom/dist/bundle.js"></script>

## Usage

```javascript
var svd = require('simple-virtual-dom')

var el = svd.el
var diff = svd.diff
var patch = svd.patch

// 1. use `el(tagName, [propeties], children)` to create a virtual dom tree
var tree = el('div', {'id': 'container'}, [
    el('h1', {style: 'color: blue'}, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('ul', [el('li')])
])

// 2. generate a real dom from virtual dom. `root` is a `div` element
var root = tree.render()

// 3. generate another different virtual dom tree
var newTree = el('div', {'id': 'container'}, [
    el('h1', {style: 'color: red'}, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('ul', [el('li'), el('li')])
])

// 4. diff two virtual dom trees and get patches
var patches = diff(tree, newTree)

// 5. apply patches to real dom
patch(root, patches)

// now the `root` dom is updated
```

You can checkout the full example in `example` folder.

You should always provide a unique `key` property for each child in array(just like ReactJS's keyed children) for Virtual-DOM to reorder children instead of replacing the whole list when perform diff algorithm.

```javascript
var root = el('ul', [
  el('li', {key: 'uid1'}, ['Jerry']),
  el('li', {key: 'uid2'}, ['Tomy']),
  el('li', {key: 'uid3'}, ['Lucy']),
])

var newRoot = el('ul', [
  el('li', {key: 'uid1'}, ['Jerry']),
  el('li', {key: 'uid2'}, ['Tomy']),
  el('li', {key: 'uid4'}, ['Lily']),
  el('li', {key: 'uid3'}, ['Lucy']),
])

// ensure `patches` is minimum
var patches = diff(root, newRoot)
```

## License

The MIT License (MIT)

Copyright (c) 2015 Livoras

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



