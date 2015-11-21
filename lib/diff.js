var _ = require('./util')
var patch = require('./patch')
var listDiff = require('list-diff2')

function diff (oldTree, newTree) {
  var index = 0
  var patches = {}
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

function dfsWalk (oldNode, newNode, index, patches) {
  var currentPatch = []

  // node is removed
  if (newNode === null) {
    currentPatch.push({type: patch.REMOVE})
  // textNode content replacing
  } else if (_.isString(oldNode) && _.isString(newNode)) {
    currentPatch.push({ type: patch.TEXT, content: newNode })
  // nodes are the same, diff its props and children
  } else if (
      oldNode.tagName === newNode.tagName &&
      oldNode.key === newNode.key
    ) {
    // diff props
    var propsPatches = diffProps(oldNode, newNode)
    if (propsPatches) {
      currentPatch.push({ type: patch.PROPS, props: propsPatches })
    }
    // diff children
    diffChildren(oldNode.children, newNode.children, index, patches)
  // nodes are not the same, replace the old node with new node
  } else {
    currentPatch.push({ type: patch.REPLACE, node: newNode })
  }

  patches[index] = currentPatch
}

function diffChildren (oldChildren, newChildren, index, patches) {
  var diffs = listDiff(oldChildren, newChildren, 'key')
  newChildren = diffs.children

  if (diffs.moves.length) {
    patches[index].push({ type: patch.REORDER, moves: diffs.moves })
  }

  var leftNode = { count: 0 }
  oldChildren.forEach(function (child, i) {
    var newChild = newChildren[i]
    index++
    dfsWalk(child, newChild, index + leftNode.count)
    leftNode = newChild
  })
}

function diffProps (oldNode, newNode) {
  var oldProps = oldNode.props
  var newProps = newNode.props

  var key, value
  var propsPatches = {}

  // find out different properties
  for (key in oldProps) {
    value = oldProps[key]
    if (newProps[key] !== value) {
      propsPatches[key] = newProps[key]
    }
  }

  // find out new property
  for (key in newProps) {
    value = newProps[key]
    if (!oldProps.hasOwnProperty(key)) {
      propsPatches[key] = newProps[key]
    }
  }

  return propsPatches
}

module.exports = diff
