var data = {
    products  : [],
};
var usr;

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
    var scroll = $(document).scrollTop();
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
var boxes = $('.box-left');
var userActivity = $('#users-info');
var userData = $('#users-activity');
var prodRating = $('.rate-left');
var inputRate = $('#rate-title');
var prodStores = $('.marg-left');
var stores_display = $('.descript-stores');
var navBar = $('.in');
if (screen.width < 960) {
    boxes.removeClass('box-left');
    element.removeClass('r-inline');
    userActivity.removeClass('fixed-pos');
    userActivity.width('auto');
    userActivity.css("left", "auto");
    userData.width('auto');
    userData.css("left", "auto");
    prodRating.removeClass('rate-left');
    navBar.removeClass('in');
    $('.rate_pr_but').removeClass('rate_pr_but');
    $('.add_st_but').removeClass('add_st_but');
    $('.profile-buttons').removeClass('profile-buttons');
    $('.profile-buttons-serv').removeClass('profile-buttons-serv');
    $('.add_se_but').removeClass('add_se_but');
    $('.fix-str-left').removeClass('marg-left');
}



$(document).ready(function() {
    if (window.innerWidth < 960 ) {
        $('#product-info').removeClass('stores-left'); 
        $('#product-info').attr('width', '100%');
        $('#product-info').attr('margin', 'auto');
        $('#product-info').attr('left', 'auto');        
        $('.row').removeClass('marg-left'); 
        $('.rate-left').removeClass('rate-left');
        $('#responsive-image').show();
        $('.row').removeClass('marg-left');  
        $('.descript').removeClass('descript');      
    }
});