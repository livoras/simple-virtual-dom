/* global describe, it*/

var el = require('../lib/element')

var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
chai.use(sinonChai)
chai.should()

describe('Test Element', function () {
  global.document = {}

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

  it('Calling render method', function () {
    var props = {style: 'color: red'}
    var root = el('ul', props, [
      el('li'),
      el('li', [el('span')]),
      'Fuck'
    ])
    var spy0 = sinon.spy()
    var spy3 = sinon.spy()
    var spy2 = document.createTextNode = sinon.spy()
    var spy1 = document.createElement = sinon.stub().returns({
      setAttribute: spy0,
      appendChild: spy3
    })
    root.render()
    spy0.should.have.calledWith('style', 'color: red')
    spy1.should.have.callCount(4)
    spy2.should.have.been.calledWith('Fuck')
    spy3.should.have.callCount(4)
  })

  it('Using `count` to get DFS index is right', function () {
    var root = el('div', [
      el('div', [el('div'), el('p'), el('p')]),
      el('p', [el('span'), el('span'), el('span')]),
      el('ul', [el('li'), el('li'), el('li')])
    ])

    var index = 0
    function dfs (root) {
      check(index, root)
      root.children.forEach(function (child) {
        index++
        dfs(child)
      })
    }

    function check (i, node) {
      switch (i) {
        case 0: return node.should.be.equal(root)
        case 1: return node.should.be.equal(root.children[0])
        case 2: return node.should.be.equal(root.children[0].children[0])
        case 3: return node.should.be.equal(root.children[0].children[1])
        case 4: return node.should.be.equal(root.children[0].children[2])
        case 5: return node.should.be.equal(root.children[1])
        case 6: return node.should.be.equal(root.children[1].children[0])
        case 7: return node.should.be.equal(root.children[1].children[1])
        case 8: return node.should.be.equal(root.children[1].children[2])
        case 9: return node.should.be.equal(root.children[2])
        case 10: return node.should.be.equal(root.children[2].children[0])
        case 11: return node.should.be.equal(root.children[2].children[1])
        case 13: return node.should.be.equal(root.children[2].children[2])
      }
    }

    dfs(root, index)
  })
})
