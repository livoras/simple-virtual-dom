/* global describe, it*/

var el = require('../lib/element')
var diff = require('../lib/diff')
var patch = require('../lib/patch')

var chai = require('chai')
chai.should()

describe('Test diff algorithm', function () {
  it('Node replacing', function () {
    var oldRoot = el('div', [el('p'), el('div'), el('section')])
    var newRoot = el('div', [el('p'), el('span'), el('section')])

    var patches = diff(oldRoot, newRoot)
    patches[2][0].type.should.be.equal(patch.REPLACE)
  })

  it('Node propeties change', function () {
    var oldRoot = el('div', [
      el('p', [el('span', { style: 'blue' })]),
      el('p', [el('span', { style: 'red' })]),
      el('p', [el('span', { style: 'yellow' })])
    ])

    var newRoot = el('div', [
      el('p', [el('span', { style: 'blue', index: '0' })]),
      el('p', [el('span', { class: 'fuck' })]),
      el('p', [el('span', { style: 'yellow green' })])
    ])

    var patches = diff(oldRoot, newRoot)
    patches[2][0].type.should.be.equal(patch.PROPS)
    patches[2][0].props.should.be.deep.equal({ index: '0' })

    patches[4][0].type.should.be.equal(patch.PROPS)
    patches[4][0].props.should.be.deep.equal({ style: void 555, class: 'fuck' })

    patches[5][0].type.should.be.equal(patch.PROPS)
    patches[5][0].props.should.be.deep.equal({ style: 'yellow green' })
  })

  it('Node removing', function () {
    var oldRoot = el('div', [
      el('p', [el('span', { style: 'blue' })]),
      el('p', [el('span', { style: 'red' }), el('p'), el('div')]),
      el('p', [el('span', { style: 'yellow' })])
    ])

    var newRoot = el('div', [
      el('p', [el('span', { style: 'blue' })]),
      el('p', [el('span', { style: 'red' })]),
      el('p', [el('span', { style: 'yellow' })])
    ])

    var diffs = diff(oldRoot, newRoot)
    diffs[3][0].type.should.be.equal(patch.REORDER)
    diffs[3][0].moves.should.be.deep.equal([
      { type: 0, index: 1 },
      { type: 0, index: 1 }
    ])
  })

  it('Reordering with keyed items', function () {
    var oldRoot = el('ul', [
      el('li', {key: 'a'}),
      el('li', {key: 'b'}),
      el('li', {key: 'c', style: 'shit'}),
      el('li', {key: 'd'}),
      el('li', {key: 'e'})
    ])

    var newRoot = el('ul', [
      el('li', {key: 'a'}),
      el('li', {key: 'c'}),
      el('li', {key: 'e'}),
      el('li', {key: 'd'}),
      el('li', {key: 'b', name: 'Jerry'})
    ])

    var diffs = diff(oldRoot, newRoot)
    diffs[2][0].type.should.equal(patch.PROPS)
    diffs[3][0].type.should.equal(patch.PROPS)

    diffs[2][0].props.should.deep.equal({name: 'Jerry'})
    diffs[3][0].props.should.deep.equal({style: void 555})

    diffs[0][0].type.should.equal(patch.REORDER)
    diffs[0][0].moves.length.should.equal(4)
  })

  it('Text replacing', function () {
    var oldRoot = el('div', [
      el('p', ['Jerry', 'is', 'my', 'love']),
      el('p', ['Jerry', 'is', 'my', 'love'])
    ])

    var newRoot = el('div', [
      el('p', ['Jerry', 'is', 'my', 'love']),
      el('p', ['Lucy', 'is', 'my', 'hate'])
    ])

    var diffs = diff(oldRoot, newRoot)
    diffs[7][0].type.should.be.equal(patch.TEXT)
    diffs[10][0].type.should.be.equal(patch.TEXT)
  })
})
