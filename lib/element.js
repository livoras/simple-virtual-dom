var _ = require('./util')

/**
 * Virtual-dom Element.
 * @param {String} tagName
 * @param {Object} props - Element's properties,
 *                       - using object to store key-value pair
 * @param {Array<Element|String>} - This element's children elements.
 *                                - Can be Element instance or just a piece plain text.
 */
function Element (tagName, props, children) {
  if (!(this instanceof Element)) {
    return new Element(tagName, props, children)
  }

  if (_.isArray(props)) {
    children = props
    props = void 666
  }

  this.tagName = tagName
  this.props = props
  this.children = children || []
  this.key = props
    ? props.key
    : void 666

  var count = 0

  this.children.forEach(function (children) {
    if (children && children.count) {
      count += children.count
    }
    count++
  })

  this.count = count
}

module.exports = Element
