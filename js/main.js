var data = {
    products  : [],
};
var usr;
var cartArray = JSON.parse(sessionStorage.getItem('cart') || '[]');

/**Display username after login and logout link */
$.post('ajax/get_session.php', null, function (data) {
    if (data.username) {
        usr = data.username;
        $('#anthrwpaki').hide();
        $('.nav-logout').show();
        $('#insert').css('display', 'block');
        $('#index_info_hide').hide();
        $('#index_info_hide2').hide();
    }  else {      
        $('.add-buttons').on('show.bs.modal', function (e) {
            e.preventDefault();
            alert('Login first!');
        });
    }
}, 'json');

function checkDivs () {
    $.post('ajax/get_session.php', null, function (data) {
        if (data.username) {
            $('.dis').prop("disabled", false);
            $('.rating-container').removeClass('rating-disabled');
         }
    }, 'json');
}
var urlParams = getUrlParams();
function getUrlParams() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]).replace(/\+/g,' ');
  });
  return result;
}

/**Check if data for loging in is correct */
$('#signin-form').submit(function (event) {
    event.preventDefault();
    if ( !( $('#login_username').val().length < 3 || $('#login_username').val().length > 20 ) ) {
        if ( !( $('#login_password').val().length < 3 || $('#login_password').val().length > 20 ) ) {
            $.post('ajax/check_login.php', $(this).serialize(), function (data) {                
                if (data.user_found) {
                    if ( window.location.href.includes('signup') ){
                        window.location = 'index.html';    
                    } else { 
                        window.location = window.location.href;
                    }
                } else if (data.mysql_error) {
                    alert(data.mysql_error);
                }
                else {
                    $('#login-check').show();
                }
            }, 'json');
        }
        else {
            $('.names-check').show();
        }
    }
    else {
        $('.names-check').show();
    }
});
/**Function to destroy session and log out */
function logout() {
    $.post('ajax/session_close.php', null, function (data) {
        if (data.status === 'ok') {
            window.location = 'index.html';
        }
    }, 'json');
    return false;
}

/**Code for search-boxes to fill them from db */
$(document).ready(function(){ 
    $('.search-form-product').submit(function (event) {
        var input = $(this).serialize();
        input = input.split("=");
        input=input[1];
        if ( input.length < 2 ){
            $('.search-alert').css('visibility', 'visible');
            event.preventDefault();
        }  
    }); 

    $.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'ajax/products_names.php',
    success: function(_data) {
        data.products = _data.product;
        $( ".search-product" ).autocomplete({
            source: data.products.map( product => product.name ),
            delay: 400,
            response: function(event, ui) {
                if (ui.content.length === 0) {
                    $("#product-search-box-empty").show();
                } else {
                    $("#product-search-box-empty").hide();
                }
            }
        });        
    }
    });
}); 

/** Remove dropdown menu on focus out */
// $('#product-search-box-empty').on('focusout', function() {
$(document).ready(function(){
    $('.search-product').on('focusout', function(){
        var clicked = false;
        if ( $('#product-search-box-empty').css('display') == 'block' ) {
            $("#product-search-box-empty").click(function(){
                setTimeout(function(){
                    $('#product-search-box-empty').hide();
            },400);
                clicked = true;                            
            });
            setTimeout(function(){
                if ( !clicked ) {
                    $('#product-search-box-empty').hide();
                }
            },400);
        }
    });
});

function drawRatingStars(num) {
    var FULL_STAR = '<i class="display-star glyphicon glyphicon-star"></i>';
    var SEMI_STAR = '<i class="display-star glyphicon glyphicon-star-semi"></i>';
    var EMPTY_STAR = '<i class="display-star glyphicon glyphicon-star-empty"></i>';

    var result = FULL_STAR.repeat( parseInt(num) );
    if (num % 1) result += SEMI_STAR;
    result += EMPTY_STAR.repeat( 5 - parseInt( Math.round(num) ) );

    return result;
}
$.post('ajax/get_best_products.php', {limit: 6}, function (response) {
    if (response.error) {
        alert(response.error);
        return;
    }

    for ( var product of response.products ) {
        var index = response.products.indexOf(product);
        var $el = $('#p' + index);
        product.avg =  Number( Math.round( (product.avg/2) * 2 ) / 2 );
        product.link = 'product.html?id=' + product.id;
        $el.find('a').attr('href', product.link);
        $el.find('.prod-name').text(product.name); 
        $el.find('.prod-image').attr("src",""+product.image+""); 
        $el.find('.prod-avg').html( drawRatingStars(product.avg) + '(' + product.avg + ')' );
        $el.find('.prod-price').text(product.price + "€"); 
        $el.find('.btn').attr('id', ""+product.id+"");
    }

}, 'json');

var element = $('.test');
var navBar = $('.in');
if (screen.width < 960) {
    element.removeClass('r-inline');
    navBar.removeClass('in');
}

$(document).ready(function() {
    if (window.innerWidth < 960 ) {
        $('#product-info').removeClass('stores-left'); 
        $('#product-info').attr('width', '100%');
        $('#product-info').attr('margin', 'auto');
        $('#product-info').attr('left', 'auto');        
        $('.row').removeClass('marg-left'); 
        $('#rating-div').removeClass('stores-left');
        $('#responsive-image').show();
        $('.row').removeClass('marg-left');  
        $('.descript').removeClass('descript'); 
        $('.search-inside-button').css('margin-left', '-12%' );     
    }
    if (window.location.href.includes('index')) {
        $('#nav-search').hide();
    } else {
        $('#nav-search').show();
    }
});