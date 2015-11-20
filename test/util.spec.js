/* global describe, it*/

var chai = require('chai')
var _ = require('../lib/util')

chai.should()

describe('Test utilities', function () {
  it('Test isArray function', function () {
    _.isArray([]).should.be.true
  })

  it('Checking object type', function () {
    _.type({}).should.be.equal('Object')
  })
})
