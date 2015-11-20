/* global describe, it*/

var chai = require('chai')
var el = require('../lib/element')

chai.should()

describe('Test for Element', function () {
  it('Elment count with the sum of its children\'s count', function () {
    var root = el('ul', {name: 'jerry'}, [
      el('li', null, [el('span')]),
      el('li', null, [el('span')]),
      el('li', null, [el('span')]),
      el('li', null, [el('span')])
    ])

    root.count.should.be.equal(8)
    root.props.should.be.deep.equal({name: 'jerry'})
  })
})
