(function($) {
    
  'use strict';


  /**
   * =====================================
   * Function for windows height and width      
   * =====================================
   */
  function windowSize( el ) {
    var result = 0;
    if("height" == el)
        result = window.innerHeight ? window.innerHeight : $(window).height();
    if("width" == el)
      result = window.innerWidth ? window.innerWidth : $(window).width();

    return result; 
  }


  /**
   * =====================================
   * Function for email address validation         
   * =====================================
   */
  function isValidEmail(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
  };


  /**
   * =====================================
   * Function for windows height and width      
   * =====================================
   */
  function deviceControll() {
    if( windowSize( 'width' ) < 768 ) {
      $('body').removeClass('no-mobile').addClass('mobile');
    }
    else if( windowSize( 'width' ) < 992 ){
      $('body').removeClass('mobile').addClass('tablet');
    }
    else {
      $('body').removeClass('mobile').addClass('desktop');
    }
  }



  /**
   * =======================================
   * Header Content Scrolling Effect
   * =======================================
   */
  function parallaxOpacity() {
    var documentEL = $(document),
        parallaxBG = $('.header');
    parallaxBG.css({
      //'transition': 'all 0.2s ease-out',
      'background-position': '50%' + ' 50%'
    })
    documentEL.on('scroll', function() {
      $('.vertical-middle').css({
          opacity: 1 - 1.85 * ( $(window).scrollTop() - 0 ) / ( $('.header').height() * 1.5 )
      })
      
      if( windowSize('width') > 767 ) {
        var curScrollPos = documentEL.scrollTop();
        parallaxBG.css( 'background-position', '50% ' + -curScrollPos/4 + 'px' )
      }else {
        parallaxBG.css({ 'background-position': '50%' + ' 50%' })
      }
    });
  }


  $(window).on('resize', function() {

    deviceControll();
    parallaxOpacity();

  });



  $(document).on('ready', function() {

    deviceControll();
    parallaxOpacity();



    /**
     * =======================================
     * Top Fixed Navbar
     * =======================================
     */
    $(document).on('scroll', function() {
      var scrollPos = $(this).scrollTop();

      if( scrollPos > ($('.header').height() / 2) ) {
        $('.navbar-fixed-top').addClass('navbar-home');
      } 
      else {
        $('.navbar-fixed-top').removeClass('navbar-home');
      }
    });


    /**
     * =======================================
     * NAVIGATION SCROLL
     * =======================================
     */
    $('#navbar-nav').onePageNav({
        currentClass: 'active',
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        scrollSpeed: 1000
    });
    $('#navbar-nav, .btn-scroll').localScroll({
      offset:       -Math.abs( $('.navbar-header').outerHeight() )
    });


    /**
     * =======================================
     * Hover active class for pricing table
     * =======================================
     */
    var pricingTable = $('.pricing-table-js');
    pricingTableMouseLeave( pricingTable );
    pricingTable.find('.table-single').on('mouseenter', function() {
      var action        = $(this);

      pricingTable.find('.active').removeClass('active');
      action.addClass('active');
    });

    // When mouse leave this pricing table this time actime before active pricing pabel
    // If you do not use this code comment this function. Like this /* ..code.. */
    pricingTable.find('.table-single').on('mouseleave', function() {
      pricingTableMouseLeave( pricingTable );
    });

    function pricingTableMouseLeave( pricingTable ) {
        pricingTable.find('.active').removeClass('active');
        pricingTable.find('.open').addClass('active');
    }




    /**
     * =======================================
     * COLLAPSE SECTION
     * =======================================
     */
    var faq = $('.faq-group-js');

    faq.find('.each-faq').each(function() {
      if( !$(this).hasClass('open') ) {
        $(this).find('.faq-content').hide();
      }
    });

    faq.find('.faq-trigger').on('click', function(el) {
      el.preventDefault();

      var openFaq = $(this).closest('.each-faq');

      openFaq.toggleClass('open').find('.faq-content').slideToggle( 300 );
      openFaq.siblings('.each-faq:visible').each(function() {
        $(this).removeClass('open').find('.faq-content').slideUp( 300 );
      });

    })



    /**
     * =========================================
     * Count Down
     * =========================================
     */
    $('.count-down-js').countdown({
        end_time: "2016/10/21 14:27:28 +0600",
        wrapper: function(unit){
            var wrpr = $('<div></div>').
                addClass(unit.toLowerCase()+'_wrapper').
                addClass('each-item').
                addClass('col-sm-3').
                addClass('col-xs-12');

            var inner = $('<div></div>').
                addClass('inner').
                appendTo(wrpr);

            var group = $('<div></div>').
                addClass('group').
                appendTo(inner);

            $('<h3 class="counter number"></h3>').appendTo(group);
            $('<h4 class="title">'+unit+'</h4>').appendTo(group);
            return wrpr;
        }
    });



    /******************** GOOGLE MAP ********************/
    var initMapBig = function() {
       var where = {lat: 24.892467, lng: 91.87048};
       var map = new google.maps.Map(document.getElementById('map-js'), {
          zoom: 17,
          center: {lat: 24.892467, lng: 91.87048},
          scrollwheel: false,
          // styles: [{"stylers": [{"saturation": -100}]}],
       });

       var contentString = '<div class="map-info-window">' +
          '<h3 id="name" class="title-text">ENA</h3>' +
          '<p class="sub-title">Official New Location</p>'
          '</div>';

       var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 318,
          borderRadius: 17,
          backgroundColor: '#161616',
          hideCloseButton: true,
          borderWidth: 0,
          shadowStyle: 0,
          disableAutoPan: false

       });

       var marker = new google.maps.Marker({
          position: where,
          map: map,
          title: 'Where title'
       });

       marker.addListener('click', function() {
          infowindow.open(map, marker);
       });
       infowindow.open(map, marker);
       
    }

    if( document.getElementById('map-js') != null ) {
       // map initialize
       initMapBig();
    }




    /**
     * ============================
     * CONTACT FORM 2
     * ============================
    */
    $("#contact-form-2").on('submit', function(e) {
      e.preventDefault();
      var success = $(this).find('.email-success'),
        failed = $(this).find('.email-failed'),
        loader = $(this).find('.email-loading'),
        postUrl = $(this).attr('action');

      var data = {
        name: $(this).find('.contact-name').val(),
        email: $(this).find('.contact-email').val(),
        subject: $(this).find('.contact-subject').val(),
        message: $(this).find('.contact-message').val()
      };

      if ( isValidEmail(data['email']) && (data['message'].length > 1) && (data['name'].length > 1) ) {
        $.ajax({
          type: "POST",
          url: postUrl,
          data: data,
          beforeSend: function() {
            loader.fadeIn(1000);
          },
          success: function(data) {
            loader.fadeOut(1000);
            success.delay(500).fadeIn(1000);
            failed.fadeOut(500);
          },
          error: function(xhr) { // if error occured
            loader.fadeOut(1000);
            failed.delay(500).fadeIn(1000);
            success.fadeOut(500);
          },
          complete: function() {
            loader.fadeOut(1000);
          }
        });
      } else {
        loader.fadeOut(1000);
        failed.delay(500).fadeIn(1000);
        success.fadeOut(500);
      }

      return false;
    });




    /**
     * =================================
     *  TICKET FORM
     * =================================
     */
    $("#ticket-form").on('submit', function(e) {
      e.preventDefault();
      var success = $(this).find('.email-success'),
        failed = $(this).find('.email-failed'),
        loader = $(this).find('.email-loading'),
        postUrl = $(this).attr('action');

      var data = {
        name: $(this).find('.contact-name').val(),
        email: $(this).find('.contact-email').val(),
        plan: $(this).find('.contact-plan').val()
      };

      if ( isValidEmail(data['email']) && (data['name'].length > 1) && (data['plan'].length > 1) ) {
        $.ajax({
          type: "POST",
          url: postUrl,
          data: data,
          beforeSend: function() {
            loader.fadeIn(1000);
          },
          success: function(data) {
            loader.fadeOut(1000);
            success.delay(500).fadeIn(1000);
            failed.fadeOut(500);
          },
          error: function(xhr) { // if error occured
            loader.fadeOut(1000);
            failed.delay(500).fadeIn(1000);
            success.fadeOut(500);
          },
          complete: function() {
            loader.fadeOut(1000);
          }
        });
      } else {
        loader.fadeOut(1000);
        failed.delay(500).fadeIn(1000);
        success.fadeOut(500);
      }

      return false;
    });




    /**
     * =============================================
     * MAILCHIMP NEWSLETTER SUBSCRIPTION 
     * =============================================
     */
    $("#mailchimp-subscribe").ajaxChimp({
        callback: mailchimpCallback,
        url: "http://deviserweb.us8.list-manage.com/subscribe/post?u=8035b74ecdb23c8ce0ccb094f&id=1a9b909143" // Replace your mailchimp post url inside double quote "".  
    });

    function mailchimpCallback(resp) {
         if(resp.result === 'success') {
            $('.subscription-success')
                .html('<i class="fa fa-check"></i>' + "&nbsp;" + resp.msg)
                .delay(500)
                .fadeIn(1000);

            $('.subscription-failed').fadeOut(500);
            
        } else if(resp.result === 'error') {
            $('.subscription-failed')
                .html('<i class="fa fa-close"></i>' + "&nbsp;" + resp.msg)
                .delay(500)
                .fadeIn(1000);
                
            $('.subscription-success').fadeOut(500);
        }  
    };




    /**
     * ====================================
     * LOCAL NEWSLETTER SUBSCRIPTION
     * ====================================
     */
    $("#local-subscribe").on('submit', function(e) {
        e.preventDefault();
        var data = {
            email: $("#subscriber-email").val()
        };

        if ( isValidEmail(data['email']) ) {
            $.ajax({
                type: "POST",
                url: "../../assets/php/subscribe.php",
                data: data,
                success: function() {
                    $('.subscription-success').fadeIn(1000);
                    $('.subscription-failed').fadeOut(500);
                }
            });
        } else {
            $('.subscription-failed').fadeIn(1000);
            $('.subscription-success').fadeOut(500);
        }

        return false;
    });




    /**
     * =======================================
     * TESTIMONIAL SYNC WITH CLIENTS
     * =======================================
     */
     // Testimonial Slider 1
    var testimonials_1 = new Swiper('.testimonials-1 .testimonials-content', {
      slidesPerView: 1,
      autoplay: 3000,
      slideToClickedSlide: true
    });
    var testimonialsThumb_1 = new Swiper('.testimonials-1 .testimonials-thumb', {
      slidesPerView: 3,
      centeredSlides: true,
      slideToClickedSlide: true,
      disableScroll: false,
      slideActiveClass: 'active'
    });
    testimonials_1.params.control = testimonialsThumb_1;
    testimonialsThumb_1.params.control = testimonials_1;


    // Testimonial Slider 2
    var testimonials_2 = new Swiper('.testimonials-2 .testimonials-content', {
      slidesPerView: 1,
      autoplay: 3000,
      slideToClickedSlide: true
    });
    var testimonialsThumb_2 = new Swiper('.testimonials-2 .testimonials-thumb', {
      slidesPerView: 3,
      centeredSlides: true,
      slideToClickedSlide: true,
      disableScroll: false,
      slideActiveClass: 'active'
    });
    testimonials_2.params.control = testimonialsThumb_2;
    testimonialsThumb_2.params.control = testimonials_2;


    // Images Screenshot Gallery
    var swiper = new Swiper('.screenshots-1 .screenshots-thumb', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      slidesPerView: 5,
      centeredSlides: true,
      spaceBetween: 15,
      autoplay: 2000,
      loop: true,
      breakpoints: {
        991: {
          slidesPerView: 3
        },

        767: {
          slidesPerView: 1
        }
      }
    });

    // Images Screenshot Gallery
    var swiper = new Swiper('.heade-swiper-slide .swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      slidesPerView: 1,
      autoplay: 3000,
      //effect: 'fade',
      loop: true
    });


  });


} (jQuery) );

