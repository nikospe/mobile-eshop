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

class Cart {
    constructor( ) {
    }
}
app.component('cart', {
  bindings: {        
    },
    template: `<div class="modal fade" id="cartModal" role="dialog">
                    <div class="modal-dialog myModal-content">
                        <div class="modal-content modals-background">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title logo">Shopping cart</h4>
                                <img src="img/cart2.png" id="logo-cart">
                            </div>
                            <div class="modal-body">
                                <div class="row text-center">
                                    <div class="col-xs-12 col-md-12">
                                        <p class="submain-color">See your products</p><br>
                                    </div>                    
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-success butoons_row" type="submit" data-dismiss="modal">Continue shopping</button>
                                <button type="button" class="btn btn-success butoons_row" data-dismiss="modal">Make order</button>
                            </div>
                        </div>
                    </div>
                </div>`,
    controller: Cart
});

function addToCart () {
    alert("added!");
}