function Element (tagName, props, childrens) {
  if (!(this instanceof Element)) {
    return new Element(tagName, props, childrens)
  }

  this.tagName = tagName
  this.props = props
  this.childrens = childrens || []
  this.key = props
    ? props.key
    : void 666

  var count = 0

  this.childrens.forEach(function (children) {
    if (children && children.count) {
      count += children.count
    }
    count++
  })

  this.count = count
}

module.exports = Element
