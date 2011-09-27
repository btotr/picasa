function Bindable(node, updateFunction) {
    if (updateFunction !== undefined)
    this.updateElement = updateFunction;
    this.setNode(node);
}

Bindable.prototype.bindData = function(data) {
    this.data = data;
}

Bindable.prototype.setNode = function(node) {
    this.node = node;
}

Bindable.prototype.getNode = function() {
    return this.node;
}

Bindable.prototype.setData = function(data) {
    this.data = data;
}

Bindable.prototype.getData = function() {
    if (!this.data) return "";
    return this.data;
}

Bindable.prototype.updateElement = function(currentNode, value) {
    console.log(currentNode, value)
}

Bindable.prototype.bindData = function(data) {
    this.setData(data);
    this.update()
}

Bindable.prototype.update = function() {
    this.updateElement(this.getNode(), this.getData());
}