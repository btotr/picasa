function Controller() {
    this.model = new Model();
    this.view = new View();
    // bind the data
    var self = this;
    this.model.getPreviewUrlsByPopularity(function(urls){
        self.view.thumbnails.bindData(urls);
    })
}

window.addEventListener('DOMContentLoaded', function(){
    new Controller()
} , false);