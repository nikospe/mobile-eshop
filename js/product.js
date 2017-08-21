checkDivs();
var productId = '';

function ShowProdRatings(){ 
    var prodData = { 'id' : productId }; 
    $.post('ajax/select_product_ratings.php', prodData, function (data) {                    
        var ratings = data.ratings;
        if ( ratings.length ) {
            $("<h4 class='submain-color marg'>Ratings: </h4><hr>").appendTo( "#product-ratings-list" );
            for( var rating of ratings ) { 
                rating.rating_strength = rating.rating_strength / 2;
                $("<h4 class='capitals'><b>"+rating.username+"</b></h4>"
                +"</h5><div class='drawStars'>"+drawRatingStars(rating.rating_strength) + '(' + rating.rating_strength + ')'+"</div>"                            
                +"<h5>"+rating.title+"</h5>"   
                +"<h6 class='text_to_end'>"+rating.time+"</h6>"           
                +"<hr>").appendTo( "#product-ratings-list" );                
            }
        }
    }, 'json'); 
}

function productRating() {
    rdata = { 'id' : productId };
    $.post('ajax/get_product_rating.php', rdata, function (response) {
        if (response.error) {
            alert(response.error);
            return;
        }
        for ( var rating of response.rating ) {
            var $el = $('.stable-rating');
            rating.rAvg =  Number( Math.round( (rating.rAvg/2) * 2 ) / 2 );

            $el.html( drawRatingStars(rating.rAvg) + '(' + rating.rAvg + ')' ); 
        }         
    }, 'json');
}

//cart
function addToCart (e) {
    var sdata = { 'id': e };
    $.post('ajax/get_product.php', sdata, function (data) {
        if (data.product) {
            var color = document.querySelector("#color-selected").value;
            var quantity = document.querySelector("#quantity-selected").value;
            var obj = { "name": data.product.name, "color": color, "quantity": quantity, "price": data.product.price };
            cartArray.push(obj);
            if ( sessionStorage.getItem(data.product.id) === null ) {
                sessionStorage.setItem(data.product.id, JSON.stringify(cartArray));
                alert('Product added to cart!');
            } else {
                obj = JSON.parse(sessionStorage.getItem(data.product.id));
                obj[0].quantity = (parseInt(obj[0].quantity) + parseInt(quantity)).toString();
                sessionStorage.setItem(data.product.id, JSON.stringify(obj));
                alert('Product added to cart!');
            }
        }
    }, 'json');
}

if (screen.width > 1000) {
    $(window).scroll( function() {
        var element = $('.profile');
        if ( $(document).scrollTop() > 128 ) {
            element.removeClass('absolute'); 
            var elemTop2 = $('.footer').offset().top - 250;
            var height = $('.profile').height();
            var width = $('.profile').width();
            var temp = elemTop2 - height -50;
            element.addClass('fixed');
            if ( $(document).scrollTop() >= temp) {
                element.removeClass('fixed');
                element.addClass('bottom');
            }
            else{
                element.addClass('fixed');
                element.removeClass('bottom');
            }
        } else {
            element.addClass('absolute');
            element.removeClass('fixed');
        }
    });
}

if ( urlParams.hasOwnProperty('id') ) {
        $.post('ajax/get_product.php', urlParams, function (data) {
            if(data.product){
                $('.no-display').hide();
                $('.empty-page').hide();
                $('.for-display').show();
                var product = data.product;
                $('#product-image').attr("src", ""+product.image+"");
                $('#responsive-img').attr("src", ""+product.image+"");
                $('#prod-title').html(product.name);
                $('.availability').html(product.availability);
                $('.warranty').html(product.warranty);
                $('#product-title').html(product.name);
                $('#product-type').html(product.type);
                $('#product-description').html(product.description);
                var descrpt = product.description.split(',');
                for (var i=0; i<descrpt.length; i++) {
                    $("<hr><h5>"+descrpt[i]+"</h5>").appendTo('#description-pattern');
                }
                $('.add-cart-button').attr("id", ""+product.id+"");
                $('#element').attr("placeholder", product.name);
                $('.prod-price').html("Price: "+ product.price +"€");
                $('.prod-code').html("Product code: MYEU"+product.id);
                productId = product.id;                
            } 
            else {                
                $('.for-display').hide();                
            } 
            productRating();
            ShowProdRatings();       
        }, 'json');
}
else if ( !('' in urlParams) ) {
    if ( urlParams.hasOwnProperty('search-product') ){
        mdata = { 'name' : urlParams['search-product'] }
    } else {
        mdata = { 'name' : decodeURIComponent(Object.keys(urlParams)[0]) }
    }
    $.post('ajax/get_product_by_name.php', mdata, function (data) {            
        var products = data.product;
        if ( !products.length ) {
            $('.for-display').hide();
            $('.dynamically-row').hide();
            $('.no-display').show();
            $('.empty-page').show();                        
            $('#prod-tit').html(mdata.name);                
            return;
        }
        if ( products.length == 1 ) {
            $('.no-display').hide();
            $('.dynamically-row').hide();
            $('.empty-page').hide();
            $('.for-display').show(); 
            $('#product-image').attr("src", ""+products[0].image+"");
            $('#responsive-img').attr("src", ""+products[0].image+"");
            $('#prod-title').html(products[0].name);
            $('.availability').html(products[0].availability);
            $('.warranty').html(products[0].warranty);
            $('#product-title').html(products[0].name);
            $('#product-type').html(products[0].type);
            $('#product-description').html(products[0].description);
            var descrpt = products[0].description.split(',');
            for (var i=0; i<descrpt.length; i++) {
                $("<hr><h5>"+descrpt[i]+"</h5>").appendTo('#description-pattern');
            }
            $('.prod-price').html("Price: "+ products[0].price +"€");
            $('.prod-code').html("Product code: MYEU"+products[0].id);
            productId = products[0].id;
            $('#element').attr("placeholder", products[0].name);
        }
        else {
            $('.no-display').hide();
            $('.for-display').hide();                
            $('dynamically').show();                      
            for ( item of products ){                        
                $("<div class='row grey-background shadow-3 products-row'>"
                +"<div class='col-sm-3 col-md-3'>"
                +"<img src='"+item.image+"' class='results-image'>"
                +"</div>"
                +"<div class='col-sm-9 col-md-9 border-left'>"
                +"<h4>Product: <a class='title' href='product.html?id="+item.id+"'>"+item.name+"</a></h4>"                
                +"<h4 class='submain-color'><span class='black'>Category: </span>"+item.type+"</h4>"
                +"<h4 class='submain-color'><span class='black'>Description: </span>"+item.description+"</h4>"
                +"</div></div>").appendTo("dynamically");  
                if (window.innerWidth < 960 ) {
                    $('.grey-background').removeClass('products-row');
                }
            } 

        }
        productRating();
        ShowProdRatings();
    }, 'json');
}
else {
    $('.empty-page').show();
}

$.getScript("js/star-rating.js", function(){         
            }); 

$('#productRate').submit(function( event ) {
    event.preventDefault();   
    if ( $('#rate-title').val() == 0 || $('#rate-product').val() == 0 ) {
        $('#leave-blank').show();
    }         
    else {
        var mData = $(this).serialize().concat( '&id='+productId );   
        $.post('ajax/insert_product_rating.php', mData, function (data) {                
            if (data.mysql_query_status) {
                window.location = window.location.href;
            } else if (data.mysql_error) {
                alert(data.mysql_error);
            }
        }, 'json');  
    }           
});