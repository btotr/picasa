function View() {
    var thumbnailsNode = document.getElementsByTagName("ul")[0];
    this.thumbnails = new List(thumbnailsNode, function(node, value) {
        console.log("test")
       var node = node.getElementsByTagName("img")[0];
       node.setAttribute("src", value);
    });
}