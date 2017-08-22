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

    makeOrder () {
        if ( cartArray.length != 0 ){
            if ( logedin === true ) {
                window.location = "order.html";
            }
        } else {
            alert("No products in your cart!");
        }
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
                                <button ng-click="$ctrl.makeOrder()" type="button" class="btn btn-success butoons_row" data-dismiss="modal">Continue with order</button>
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


class MakeOrderCtrl {
    constructor () {

    }

    $onInit() {
        this.cart = cartArray;
        this.totalAmount = 0;
        for (const item of cartArray) {
            this.totalAmount += item.price;
        }         
    }

    successOrder() {
        alert("Your order has completed successful. You will receive a verification email. Thank you!");
        sessionStorage.removeItem('cart');
        window.location = "index.html";
    }
}

app.component('makeOrder', {
  bindings: {        
    },
    template: `<div id="order-form">
                <form class="form-group">
                    <div class="form-group">
                        <label for="formGroupExampleInput">Name</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="John" pattern="([A-z]){2,}">
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">Surname</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Smith" pattern="([A-z]){2,}">
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput">Email</label>
                        <input type="email" class="form-control" id="formGroupExampleInput" placeholder="john@gmail.com">
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">Phone</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="6985214788" pattern="([0-9]){10}">
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">Country</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Greece" pattern="([A-z]){2,}">
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">State</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Attiki" pattern="([A-z]){2,}">
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput">Town</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Aigaleo" pattern="([A-z]){2,}">
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">Address</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Makri 59" pattern="([A-z0-9]){4,20}">
                    </div>
                    <fieldset class="form-group row">
                        <legend class="col-form-legend col-sm-2">Payment</legend>
                        <div class="col-sm-10">
                            <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
                                Credit card
                            </label>
                            </div>
                            <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                                Cash on delivery
                            </label>
                            </div>
                            <div class="form-check disabled">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3">
                                Cash in our Store
                            </label>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <form>
                    <div class="form-group">
                        <label for="formGroupExampleInput">Your order</label>
                    </div>  
                    <hr>              
                    <div ng-repeat="prd in $ctrl.cart track by $index">
                        <span class="cart-pr-info">{{prd.name}}</span>
                        <span class="cart-pr">Color: </span>
                        <span class="cart-pr-info">{{prd.color}}</span>
                        <span class="cart-pr">Quantity: </span>
                        <span class="cart-pr-info">{{prd.quantity}}</span>
                        <span class="cart-pr">Price: </span>
                        <span class="cart-pr-info">{{prd.price}}€</span>
                        <hr>
                    </div>
                    <button ng-click="$ctrl.successOrder()" id="success-order" class="btn btn-success butoons_row" type="submit" value="submit">Make Order</button>
                </form>
                <span class="cart-pr">Total amount: {{$ctrl.totalAmount}} €</span>
                </div>`,
    controller: MakeOrderCtrl
});