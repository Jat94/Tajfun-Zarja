$(document).ready(function(){
    $('.s-header-burger').click(function(){
        $(this).toggleClass('s-active');
        $('.s-header-menu').toggleClass('s-active');
    });

    $('.s-header-menu-element.s-has-dropdown').click(function(){
        $(this).find('.s-header-menu-dropdown-list').slideToggle(200);
        $(this).toggleClass('s-active-mobile');
    });

    calcContentHeight();
    $(window).resize(function() {
        $('.s-header-menu-dropdown-list').removeAttr('style');
        $('.s-content').removeAttr('style');
        calcContentHeight();
    });

});
function calcContentHeight() {
    const footerHeight = $('.s-footer').outerHeight();
    const headerHeight = $('.s-header').outerHeight();
    const windowHeight = $(window).outerHeight();
    if ($(window).width() > 768) {
        const contentHeight = windowHeight - headerHeight - footerHeight;
        $('.s-content').height(contentHeight);
    } else {
        const contentHeight = windowHeight - footerHeight;
        $('.s-content').css('min-height', contentHeight + 'px');
    }
}