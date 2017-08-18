var app = angular.module('cartApp', []);

class Bestproducts {
    constructor( ) {
        
    }
}

app.component('bestproducts', {
  bindings: {        
    },
    template: `<div class="col-md-6 col-sm-12 text-center box-size box-background"
                ng-repeat = 'value in [ "p0","p1","p2","p3","p4","p5"]' id="{{value}}">                
                <img src"" class="prod-image">
                <a href=""><h4 class="prod-name capitals titles"></h4></a>
                <h5 class="prod-avg"></h5>
                <a href="#" onclick="addToCart();"><img src="img/cartbut.png" class="cart-button"></a>
            </div>`,
    controller: Bestproducts
});


function addToCart () {
    alert("added!");
}