/* global casper */

var el = require('../../lib/element')
var patch = require('../../lib/patch')
var diff = require('../../lib/diff')

casper.test.begin('Appy patch to real dom', 5, function (test) {
  casper.start('test/casper/index.html', function () {
    test.assertTitle('Page Test', 'Title matched')
  })

  casper.then(function () {
    var root1 = el('div', {id: 'container'}, [
      el('div'),
      el('div'),
      el('div'),
      el('div', [
        el('p', {class: 'content'}, ['I love you'])
      ])
    ])

    var root2 = el('div', {id: 'container'}, [
      el('div'),
      el('div'),
      el('div'),
      el('div', [
        el('p', {class: 'content', name: 'shit'}, ['I love you'])
      ])
    ])

    var realDOM = root1.render()
    var patches = diff(root1, root2)
    patch(realDOM, patches)
    test.assertEqual(realDOM.innerHTML, root2.render().innerHTML, 'Text content changes')
  })

  casper.then(function () {
    var root1 = el('ul', {id: 'users-list'}, [
      el('li', {key: 'a'}),
      el('li', {key: 'b'}),
      el('li', {key: 'c'}),
      el('li', {key: 'd'}),
      el('li', {key: 'e'}),
      el('li', {key: 'f'}),
      el('li', {key: 'g'}),
      el('li', {key: 'h'})
    ])

    var root2 = el('ul', {id: 'users-list2'}, [
      el('li', {key: 'a'}),
      el('li', {key: 'f'}),
      el('li', {key: 'g'}),
      el('li', {key: 'b', name: 'a b!'}),
      el('li', {key: 'c'}),
      el('li', {key: 'd'}, [el('span')]),
      el('li', {key: 'e'}),
      el('li', {key: 'i'})
    ])

    var patches = diff(root1, root2)
    var realDOM = root1.render()
    patch(realDOM, patches)
    var realDOM2 = root2.render()
    test.assertEqual(realDOM.childNodes.length, realDOM2.childNodes.length, 'Has\' the same amount of childNodes')
    test.assertEqual(realDOM.innerHTML, root2.render().innerHTML, 'Reording keyed items')
  })

  casper.then(function () {
    var color = 'blue'
    var count = 0
    var root1 = el('div', {'id': 'container'}, [
      el('h1', {style: 'color: ' + color}, ['simple virtal dom']),
      el('p', ['the count is :' + count]),
      el('ul', [el('li')])
    ])

    var root2 = el('div', {'id': 'container'}, [
      el('h1', {style: 'color: ' + color}, ['simple virtal dom']),
      el('p', ['the count is :' + count]),
      el('ul', [el('li'), el('li')])
    ])

    var dom = root1.render()
    var patches = diff(root1, root2)
    patch(dom, patches)
    test.assertEqual(dom.innerHTML, root2.render().innerHTML, 'Complicated dom')
  })

  casper.run(function () {
    test.done()
  })
})
