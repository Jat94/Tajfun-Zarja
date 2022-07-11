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
    calcInnerContentHeight();
    $(window).resize(function() {
        $('.s-header-menu-dropdown-list').removeAttr('style');
        $('.s-content').removeAttr('style');
        calcContentHeight();
        calcInnerContentHeight();
        calcSlideTextSize();
    });

    $('.s-inner-manufacturing-slider').on('init', function(event, slick){
        calcSlideTextSize();
    });
    $('.s-inner-manufacturing-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        slidesPerRow: 2,
        arrows: true,
        dots: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              slidesPerRow: 1,
              variableWidth: true
            }
          }
        ]
      });



      $('.s-inner-news-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              slidesPerRow: 1,
              variableWidth: true
            }
          }
        ]
      });


      initFilteringSlider();
      $('.s-inner-filter .s-btn').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        $('.s-inner-filter .s-btn').removeClass('s-red');
        $(this).addClass('s-red');
        let filter =  $(this).data('filter'),
            htmls = [];

        $('.s-inner-partners-slider').slick('unslick');
        $('.s-inner-partners-slider').empty();
        $('.s-inner-partners-slider-list .s-inner-partners-slide').each(function(){
            if (filter != 'all') {
              if ($(this).hasClass(filter)) {
                htmls.push($(this).clone(true, true));
              }
            } else {
              htmls.push($(this).clone(true, true));
            }
        });
        for (let i=0; i<=htmls.length; i++) {
          $('.s-inner-partners-slider').append(htmls[i]);
        }
        initFilteringSlider();
      });
      



      $('.s-inner-reviews-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
                adaptiveHeight: true
            }
          }
        ]
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


function calcInnerContentHeight() {
    if ($(window).width() > 768) {
        const innerRowHeight = $('.s-inner-row').outerHeight();
        const innerTopHeight = $('.s-inner-top').outerHeight();
        $('.s-inner-content').outerHeight(innerRowHeight- innerTopHeight);
    } else {
        $('.s-inner-content').removeAttr('style');
        $('.s-inner-cat-content').removeAttr('style');
        $('.s-inner-downloads-scroll').removeAttr('style');
        $('.s-inner-reviews-text-scroll').removeAttr('style');
    }
    $('.s-inner-scroll-conent').scrollbar();
    $('.s-inner-cat-content').scrollbar();
    $('.s-inner-downloads-scroll').scrollbar();
    $('.s-inner-reviews-text-scroll').scrollbar();
}

function calcSlideTextSize() {
    if ($(window).width() > 768) {
        $('.s-inner-manufacturing-text').each(function(){
            const elH =  $(this).outerHeight();
            const elW =  $(this).outerWidth(); 
            $(this).outerHeight(elH);
            $(this).outerWidth(elW);
        });
    } else {
        $('.s-inner-manufacturing-text').removeAttr('style');
    }  
}

function initFilteringSlider() {
  $('.s-inner-partners-slider').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    slidesPerRow: 3,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          slidesPerRow: 1,
          variableWidth: true
        }
      }
    ]
  });
}