/* global describe, it*/

var chai = require('chai')
var el = require('../lib/element')

chai.should()

describe('Test for Element', function () {
  it('Element\'s count is the sum of its children\'s count', function () {
    var root = el('ul', {name: 'jerry'}, [
      el('li', null, [el('span')]),
      el('li', null, [el('span')]),
      el('li', null, [el('span')]),
      el('li', null, [el('span')])
    ])

    root.count.should.be.equal(8)
    root.props.should.be.deep.equal({name: 'jerry'})
    root.tagName.should.be.equal('ul')
    root.children[0].tagName.should.be.equal('li')
    root.children[0].count.should.be.equal(1)
  })

  it('Element should have a key propertye if it\'s passed', function () {
    var root = el('li', {key: 'uuid'})
    root.key.should.be.equal('uuid')
  })

  it('Passing dynamic parameters: `props` is optional', function () {
    var root = el('ul', [
      el('li', null, [el('span')]),
      el('li', null, [el('span')]),
      el('li', null, [el('span')]),
      el('li', null, [el('span')])
    ])

    root.count.should.be.equal(8)
    root.tagName.should.be.equal('ul')
    root.children[0].tagName.should.be.equal('li')
    root.children[0].count.should.be.equal(1)
  })
})
