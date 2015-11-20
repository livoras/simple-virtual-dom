/* global casper */

var el = require('../../lib/element')

casper.test.begin('run', 2, function (test) {
  casper.start('test/casper/index.html', function () {
    test.assertTitle('Page Test', 'Title matched')
  })

  casper.then(function () {
    var root = el('div', [
      el('div'),
      el('div'),
      el('div'),
      el('div')
    ])
    test.assertEqual(root.count, 4, 'Element\'count should be rigth')
  })

  casper.run(function () {
    test.done()
  })
})
