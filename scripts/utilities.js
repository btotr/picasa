// helper functions

Element.prototype.addClassName = function(className){
    if(!this.getAttribute("class")) this.setAttribute("class", "");
    var classNames = this.getAttribute("class").split(" ");
    if (classNames.indexOf(className) == -1) classNames.push(className)
    this.setAttribute("class", classNames.join(" "));
}

Element.prototype.hasClassName = function(className){
    if(!this.getAttribute("class")) return false;
    var classNames = this.getAttribute("class").split(" ");
    if (classNames.indexOf(className) == -1) return false;
    return true;
}

Element.prototype.removeClassName = function(className){
    if (this.hasAttribute("class"))
        this.setAttribute("class", this.getAttribute("class").replace(className, ""));
}

Function.prototype._extends = function(parent) {
    this.prototype._super = parent; 
    for (var s in parent.prototype) { 
        this.prototype[s] = parent.prototype[s]; 
    } 
    return this;
}

Function.prototype._implements = function(parent) {
    for (var f in parent.prototype) { 
        if (this.prototype[f] !== undefined) continue
        // TODO check
        // throw new Error("methode " + f + " must be implemented in " + this.prototype)
    } 
    return this;
}

if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== "function") // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");

        var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function() {},
        fBound = function() {
            return fToBind.apply(this instanceof fNOP ? this: oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}
