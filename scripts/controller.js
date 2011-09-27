function Controller() {
    this.model = new Model();
    this.view = new View();
}

window.addEventListener('DOMContentLoaded', function(){
    new Controller()
} , false);