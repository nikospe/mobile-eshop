$('.form-add-product').submit(function (event) {
    event.preventDefault();
    if ( $('#product_name').val().length < 2 || !$('#vertical_category_selector').val() ) {
        $('.names-check').show();
    }
    else {
        $.post('ajax/add_new_product.php', $(this).serialize(), function (data) {
            if (data.mysql_query_status) {
                window.location = 'product.html?id='+data.id;
            } else if (data.mysql_error) {
                alert(data.mysql_error);
            }
        }, 'json');
    }
});

$('.close').click( function (e) {
    e.preventDefault();
    $('.names-check').hide();
});