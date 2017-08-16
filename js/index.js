function setActiveNavPill(index) {
    $('.nav.nav-pills li').removeClass('active');
    $('.nav.nav-pills li').slice(index,index+1).addClass('active');
    var type = $('.nav.nav-pills li.active').text().trim().toLowerCase();
    updateSearchFields(type);
}