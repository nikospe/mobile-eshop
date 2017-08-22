var app = angular.module('cartApp', []);

var cartProducts = [];

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
                <h5 class="prod-price"></h5>                
            </div>`,
    controller: Bestproducts
});

class Cart {
    constructor() {
    }
    $onInit() {
        this.cart = cartArray;
    }
    deleteButton (e) {
        var itemForDelete = e.target.id;
        cartArray = cartArray.filter(function(el){ return el.name != itemForDelete; });
        sessionStorage.removeItem('cart');
        sessionStorage.setItem('cart', JSON.stringify(cartArray));
    }
}
app.component('cart', {
  bindings: {   
    },
    template: `<div class="modal fade" id="cartModal" role="dialog">
                    <div class="modal-dialog myModal-content" id="cart-modal">
                        <div class="modal-content modals-background">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <img src="img/cart2.png" id="logo-cart"><span id="incart-title">Cart</span>
                            </div>
                            <div class="modal-body">
                                <div ng-repeat="prd in $ctrl.cart track by $index">
                                    <span class="cart-pr-info">{{prd.name}}</span>
                                    <span class="cart-pr">Color: </span>
                                    <span class="cart-pr-info">{{prd.color}}</span>
                                    <span class="cart-pr">Quantity: </span>
                                    <span class="cart-pr-info">{{prd.quantity}}</span>
                                    <span class="cart-pr">Price: </span>
                                    <span class="cart-pr-info">{{prd.price}}€</span>
                                    <button class="btn cart-delete-button" id="{{prd.name}}" ng-click="$ctrl.deleteButton($event)">X</button>
                                    <hr>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-success butoons_row" type="submit" data-dismiss="modal">Continue shopping</button>
                                <button type="button" class="btn btn-success butoons_row" data-dismiss="modal">Continue with order</button>
                            </div>
                        </div>
                    </div>
                </div>`,
    controller: Cart
});

class CartButton {
    togglef () {
        $('#cartModal').modal('show');
    }
}

app.component('cartButton', {
  bindings: {        
    },
    template: `<div id="wrap-cart">
                    <a ng-click="$ctrl.togglef()" href="#">
                        <img src="img/cartico.png" id="nav-cart-img">
                    </a>
                </div>`,
    controller: [CartButton]
});