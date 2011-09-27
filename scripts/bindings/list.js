/*
    Dependencies
    * scripts/bindable.js
*/

var List = function(node, updateFunction) {
    this._super(node, updateFunction)
}._extends(Bindable);

List.prototype.offset = 0;
List.prototype.direction = {previous:"left", next:"right"};

List.prototype.setTopToBottomNavigation = function() {
    this.direction = {previous:"top", next:"bottom"};
}

List.prototype.getIndex = function(offset) {
    for (var index=0,l=this.getNode().children.length; index<l;index++) {
        if (this.getNode().children[index].children[0].hasClassName("focus")) {
            return index;
            break
        }
    }
    return 0;
}

List.prototype.setOffset = function(offset) {
    this.offset = offset;
}

List.prototype.getOffset = function() {
    return this.offset;
}

List.prototype.getBorderOffset = function(){
    if (this.direction.next == "bottom") return "offsetHeight"
    return "offsetWidth"
}

List.prototype.getReversedDirection = function(direction){
    if (this.directionKeys === undefined) this.directionKeys = Object.keys(this.direction);
    return this.directionKeys[(this.directionKeys.indexOf(direction)+1)%this.directionKeys.length];
}

List.prototype.update = function() {
    var length = this.getNode().children.length;
    for ( var i=0; i<length; i++ ) 
        this.getNode().children.item(i).removeClassName("disabled");
    if (this.getData().length-this.offset <= length) {
        for ( var i=this.getData().length-this.offset; i<length; i++ ) 
                this.getNode().children.item(i).addClassName("disabled");
        length = this.getData().length - this.offset;
    }
    for ( var i=0; i<length; i++ )
        this.updateElement(this.getNode().children.item(i), this.getData()[i+this.offset])
}

List.prototype.getNextFocusableElement = function(node, direction, callback) {
    // TODO horizontal navigation
    //var rows = Math.floor(this.getNode().offsetWidth / node.offsetWidth)
    //var columns =  Math.floor(this.getNode().offsetHeight / node.offsetHeight)

    var isBorder = false;
    if (direction == "next") isBorder = node.getBoundingClientRect()[this.direction.previous] <= this.getNode().getBoundingClientRect()[this.direction.previous]  + node[this.getBorderOffset()];
    else isBorder = node.getBoundingClientRect()[this.direction.next] >= this.getNode().getBoundingClientRect()[this.direction.next]  - node[this.getBorderOffset()];
    if (isBorder) {
        //if (node.parentNode.hasClassName("disabled")) node = view.thumbnails.getNode().children[0].children[0];
        callback.call(this, node);
        return
    }
    this.getNextFocusableElement(node.parentNode[this.getReversedDirection(direction)+"ElementSibling"].firstElementChild, direction,callback);
}

List.prototype.navigate = function(direction, target, update) {
    if (direction == "next") {
        if (target.getBoundingClientRect()[this.direction.next] + 3 >= this.getNode().getBoundingClientRect()[this.direction.next]) {
            if (!(this.getData().length > this.offset + this.getNode().children.length) || update) {
                this.offset += this.getNode().children.length;
                this.update();
                return true;
            }
        }
    }
    if (direction == "previous" && this.offset != 0) {
        if (target.getBoundingClientRect()[this.direction.previous] - 3 <= this.getNode().getBoundingClientRect()[this.direction.previous])  {
            this.offset -= this.getNode().children.length;
            this.update();
            return true;
        }
    }    
    return false;
}