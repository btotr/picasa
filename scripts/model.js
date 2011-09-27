var Model = function() {
    this.name = "picasa"
    this.urls = [];
    this.proxy = "";
    this.api_key = "b98b9c412cb42ce6bb9ca669674ff9d0";
    this.getRestUrl = function(methode, param) {
	    var url = ("http://picasaweb.google.com/data/feed/api/" + methode);
	    if (this.proxy != "") url = this.proxy+encodeURIComponent(url)
        return  url;
    }
}

Model.prototype.getOriginalResource = function(url, size, callback) {
   return url
}

Model.prototype.getUrls = function(){
    return this.urls;
}

Model.prototype.requestPicasaAPI = function(url, callback){
    var self = this;
    try {
        if (!this.xhr) this.xhr = new XMLHttpRequest(); 
        else this.xhr.abort()
        this.xhr.open("GET",url, true);
        this.xhr.onreadystatechange = function() {
            if (this.readyState == 4)
                if(this.status == 200 && this.responseText != "") 
    				self.fetchData(this.responseXML, callback);
        }
        this.xhr.send();
    } catch(e) {
        console.log(e)
        callback([])
    }
}

Model.prototype.getPreviewUrlsByPopularity = function(callback) {
    var url = this.getRestUrl("featured?max-results=12&thumbsize=160")  
    this.requestPicasaAPI(url, callback)
}

Model.prototype.getPreviewUrlsByUserName = function(username, callback) {
    var url = this.getRestUrl("user/"+username+"?kind=photo&max-results=12&thumbsize=160")  
    this.requestPicasaAPI(url, callback)
}

Model.prototype.getPreviewUrlsByfullText = function(query, callback) {
   if(query == "popular") {
        this.getPreviewUrlsByPopularity(callback)
        return
    }
    var url = this.getRestUrl("all?q="+escape(query)+"&max-results=12&thumbsize=160")  
    this.requestPicasaAPI(url, callback)
}

Model.prototype.fetchData = function(response, callback) {
    this.urls = [];
    var photos = response.getElementsByTagNameNS("http://search.yahoo.com/mrss/","thumbnail");
    for (var i=0,l=photos.length;i<l;i++) this.urls.push(photos[i].getAttribute("url"));
	callback(this.urls);
}

// test
var model = new Model();
model.getPreviewUrlsByPopularity(function(urls){
    console.log(urls)
})
