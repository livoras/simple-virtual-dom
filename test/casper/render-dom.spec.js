/* global casper */

var el = require('../../lib/element')

casper.test.begin('Render DOM', 9, function (test) {
  casper.start('test/casper/index.html', function () {
    test.assertTitle('Page Test', 'Title matched')
  })

  casper.then(function () {
    var root = el('div', {
      'data-index': '0',
      'style': 'color: red'
    }, [
      el('div'),
      el('span'),
      el('p'),
      el('ul', {style: 'font-size: 12px'}),
      'Fuck you'
    ])
    var rootEl = root.render()

    test.assertEqual(root.count, 5, 'Element\'count should be rigth')
    test.assertEqual(rootEl.getAttribute('data-index'), '0', 'Should generate index 0')
    test.assertEqual(rootEl.getAttribute('style'), 'color: red', 'Should generate style')
    test.assertEqual(rootEl.style.color, 'red', 'Should have real color red')

    test.assertEqual(rootEl.childNodes.length, 5, 'Children elements should be created, too')
    test.assertEqual(rootEl.childNodes[0].tagName, 'DIV', 'Child\' tag name should be matched')
    test.assertEqual(rootEl.childNodes[3].style.fontSize, '12px', 'Child\' properties should be generated')
    test.assertEqual(rootEl.childNodes[4].textContent, 'Fuck you', 'Text nodes are also generated')
  })

  casper.run(function () {
    test.done()
  })
})
