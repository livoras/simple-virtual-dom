function Element(tagName, props, childrens) {
	this.tagName = tagName
	this.props = props
	this.childrens = childrens
	this.key = this.props.key

	childrens.forEach(function(children) {
		if (children && children.count) {
			this.count += children.count
		}
	})
}
