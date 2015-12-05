/* global describe, it*/

var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var _ = require('../lib/util')

chai.should()
chai.use(sinonChai)
chai.should()

describe('Test utilities', function () {
  it('Test isArray function', function () {
    _.isArray([]).should.be.true
  })

  it('Checking object type', function () {
    _.type({}).should.be.equal('Object')
  })

  it('Test each function', function () {
    var spy = sinon.spy()
    var list = [1, 2, 3, 4, 5]
    _.each(list, spy)
    spy.callCount.should.be.equal(5)
  })

  it('Test toArray function', function () {
    var list = [1, 2, 3, 4, 5]
    var list2 = _.toArray(list)
    list.should.be.deep.equal(list2)

    var list3 = _.toArray()
    list3.should.be.deep.equal([])
  })
})
