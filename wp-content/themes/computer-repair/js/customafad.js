(function ($) {

    "use strict";

    var $document = $(document),
        $window = $(window),
        plugins = {
            mainSlider: $('#mainSlider'),
            slideNav: $('#slide-nav'),
            categoryCarousel: $('.category-carousel'),
            testimonialsCarousel: $('.testimonials-carousel'),
            testimonialsSingleCarousel: $('.testimonials-single-carousel'),
            testimonialsSingleCarousel2: $('.testimonials-single-carousel-layout2'),
            testimonialsGrid: $('.testimonials-grid'),
            servicesCarousel: $('.text-icon-carousel'),
            servicesCarousel2: $('.text-icon-grid'),
            personCarousel: $('.person-carousel'),
            brandCarousel: $('.brand-carousel'),
            postTipsCarousel: $('.post-tips-carousel'),
            submenu: $('[data-submenu]'),
            contactForm: $('#contactform'),
            quoteForm: $('.quote-form'),
            googleMapFooter: $('#footer-map'),
            iconSquared: $('.text-icon-squared'),
            counterBlock: $('#counterBlock'),
            testimonialsMoreLink: $('.view-more-testimonials'),
            postGallery: $('.blog-isotope'),
            postCarousel: $('.post-carousel'),
            rtltrue: jQuery('body').hasClass('rtl'),
            postMoreLink: $('.view-more-post'),
            networkEffect: $('.network-effect'),
            animation: $('.animation'),
            prdCarousel: $('.prd-carousel'),
            stickyHeader: $(".page-header.sticky"),
            stackTable: $('.stack-table'),
            servicesTab: $('.services-tab-content,.prices-tab-content')
        },
        $shiftMenu = $('#slidemenu'),
        $navbarToggle = $('.navbar-toggle'),
        $dropdown = $('.dropdown-submenu, .dropdown'),
        $fullHeight = $('#mainSlider, #mainSlider .img--holder');
    var target = 3;
    var testimonialsLength = jQuery('.testimonials-item').length
    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */


    $document.ready(function () {


        $('.tab-dropdown [data-toggle]').on('click', function (e) {
            var $this = $(this);
            $this.closest('.tab-dropdown').find('li').removeClass('active');
            $this.closest('.tab-dropdown').parent('li').addClass('active');
            $this.closest('.tab-dropdown').parent('li').siblings().removeClass('active');
        })


        $(".nav-pills li").siblings().removeClass("active");
        $(".nav-pills li:nth-child(1)").addClass('active')
        // Google map options
        var windowWidth = window.innerWidth || $window.width();

        var windowH = $window.height();
        
        if (plugins.stackTable.length) {
            $(plugins.stackTable).stacktable();
        }
        // set fullheigth
        
        if (windowWidth < 992) {
            $fullHeight.height('');
        } else {
            if($(plugins.mainSlider).hasClass('mainslider2')){
                $fullHeight.height(windowH - $('.page-header').height());
            }else{
                $fullHeight.height(windowH);
            }
        }

        // detect touch
        var isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
        if (isTouchDevice) {
            $('body').addClass('touch');
        }
        // detect IOS
        if (navigator.userAgent.match(/iPhone|iPod/i)) {
            $('body').addClass('is-ios');
        }

        // main slider
        $(window).on('load',function() {
            if (plugins.mainSlider.length) {
                var $el = plugins.mainSlider;
                $el.on('init', function (e, slick) {
                    var $firstAnimatingElements = $('div.slide:first-child').find('[data-animation]');
                    doAnimations($firstAnimatingElements);
                });
                $el.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
                    var $currentSlide = $('div.slide[data-slick-index="' + nextSlide + '"]')
                    var $animatingElements = $currentSlide.find('[data-animation]');
                    doAnimations($animatingElements);
                });
                $el.slick({
                    autoplay: JSON.parse(ajax_mainslider.autoplay),
                    autoplaySpeed: parseInt(ajax_mainslider.autoplay_speed),
                    arrows: JSON.parse(ajax_mainslider.arrows),
                    dots: JSON.parse(ajax_mainslider.dots),
                    fade: true,
                    speed: 1000,
                    pauseOnHover: false,
                    pauseOnDotsHover: true

                });
            }
        });
        function servicesShowAll() {
            $('[data-show]').each(function () {
                var $this = $(this),
                    show = $this.data('show') - 1;
                $this.find('li:gt(' + show + ')').hide();
                $this.find('li:last-child').show();
            })
            $('.all-link').on('click', function (e) {
                var $this = $(this);
                $this.closest('ul').find('li').show();
                $this.hide();
                e.preventDefault();
            })
        }

        // services Tabs
        if (plugins.servicesTab.length) {
            servicesTabs();
            servicesTabsTooltip();
            servicesShowAll();
        }

        // CAROUSELS
        // products carousel
        if (plugins.prdCarousel.length) {
            plugins.prdCarousel.slick({
                slidesToShow: 4,
                slidesToScroll: 2,
                infinite: true,
                dots: false,
                arrows: true,
                autoplay: true,
                autoplaySpeed: 5000,
                responsive: [{
                    breakpoint: 1299,
                    settings: {
                        dots: true,
                        arrows: false
                    }
                }, {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        dots: true,
                        arrows: false,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 665,
                    settings: {
                        slidesToShow: 2,
                        dots: true,
                        arrows: false,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 320,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        arrows: false,
                        slidesToScroll: 1
                    }
                }]
            });
        }


        // services Tabs
        function servicesTabsTooltip() {
            $('.js-services-tab-toggle').on('click', function (e) {
                $(this).parent().toggleClass('closed');
                e.preventDefault();
            })
            $('.service-tip').each(function () {
                var $this = $(this);
                $this.css({
                    'top': $this.data('top'),
                    'left': $this.data('left')
                });
            })
            $('.service-tip').on('click', function () {
                if ((window.innerWidth || $window.width()) < 769) {
                    var tip = $(this).find('.service-tip-html').html(),
                        $tipContainer = $(this).closest('.services-tab-content-text').find('.js-service-tooltip-mob .text');
                    $tipContainer.parent().addClass('opened');
                    $tipContainer.html(tip);
                }
            })
            $('.js-service-tooltip-close').on('click', function () {
                $('.service-tooltip-mob').removeClass('opened');
            })
            $('[data-sync]').on('click', function () {
                return false;
            })
            $('.service-tip').on('mouseenter', function () {
                var $this = $(this);
                $this.closest('.tab-pane').find('.services-tab-list li').removeClass('hovered');
                $this.closest('.tab-pane').find('.service-tip').removeClass('hovered');
                $this.closest('.tab-pane').find('.' + $(this).data('sync')).addClass('hovered');
            }).on('mouseleave', function () {
                var $this = $(this);
                $this.parent().removeClass('hovered');
                $this.closest('.tab-pane').find('.' + $(this).data('sync')).removeClass('hovered');
            })
            $('[data-sync]').on('mouseenter', function () {
                var $this = $(this);
                $this.parent().siblings().removeClass('hovered');
                $this.closest('.tab-pane').find('.service-tip').removeClass('hovered');
                $this.closest('.tab-pane').find('.' + $(this).data('sync')).addClass('hovered');
            }).on('mouseleave', function () {
                var $this = $(this);
                $this.parent().removeClass('hovered');
                $this.closest('.tab-pane').find('.' + $(this).data('sync')).removeClass('hovered');
            })
            $(window).on('resize', function () {
                $('.service-tooltip-mob').removeClass('opened');
            });
        }

        function servicesTabs() {
            $('.tab-dropdown [data-toggle]').on('click', function (e) {
                var $this = $(this);
                $this.closest('.tab-dropdown').find('li').removeClass('active');
                $this.closest('.tab-dropdown').parent('li').addClass('active');
                $this.closest('.tab-dropdown').parent('li').siblings().removeClass('active');
            })
            $('.js-col-toggle').on('click', function (e) {
                var $this = $(this);
                if ($this.data('target')) {
                    $this.parent().siblings().removeClass('active');
                    $this.parent().addClass('active');
                    $this.closest('.tab-pane').find('.col-price > *').addClass('hidden');
                    $this.closest('.tab-pane').find('.' + $this.data('target')).removeClass('hidden');
                }
                e.preventDefault();
            })
            $('.nav-pills > li').on('click', function (e) {
                var $this = $(this);
                if ($('body').hasClass('touch')) {
                    $this.addClass('active hovered');
                    $this.siblings().removeClass('active hovered');
                    var a=jQuery(this).find('a').attr('href')
                    $('.tab-pane').removeClass('in active')
                    $(a).addClass('in active')
                } else {
                    $this.removeClass('active hovered');
                }
            })
            $(document).on('touchstart', function (event) {
                if (!$(event.target).closest('.nav-pills').length) {
                    $('.nav-pills > li').removeClass('active hovered');
                }
            })
        }
        // end services Tabs
        // 
        // 
        // apply network effect
        if (plugins.networkEffect.length && !$('body').hasClass('touch')) {
            networkEffect();
        }

        // number counter
        if (plugins.counterBlock.length) {
            plugins.counterBlock.waypoint(function () {
                $('.number > span', plugins.counterBlock).each(count);

            }, {
                    triggerOnce: true,
                    offset: '80%'
                });
        }

        // CAROUSELS

        // testimonials carousel
        if (plugins.testimonialsCarousel.length) {
            plugins.testimonialsCarousel.slick({
                mobileFirst: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2000,
                rtl: plugins.rtltrue,
                arrows: true,
                dots: true,
                responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1
                    }
                }]
            });
        }

        // testimonials single carousel
        if (plugins.testimonialsSingleCarousel.length) {
            plugins.testimonialsSingleCarousel.slick({
                mobileFirst: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2000,
                rtl: plugins.rtltrue,
                arrows: true,
                dots: true,

            });
        }

        //alert(plugins.testimonialsSingleCarousel2.length)
        //console.log(plugins.testimonialsSingleCarousel2.length);
        if (plugins.testimonialsSingleCarousel2.length) {
            plugins.testimonialsSingleCarousel2.slick({
                mobileFirst: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 4000,
                arrows: false,
                dots: true
            });
        }
        // Tips carousel
        if (plugins.postTipsCarousel.length) {
            plugins.postTipsCarousel.slick({
                mobileFirst: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: false,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: false,
                dots: true,
                responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1
                    }
                }]
            });
        }
        // person carousel
        if (plugins.personCarousel.length) {
            plugins.personCarousel.slick({
                mobileFirst: false,
                slidesToShow: 4,
                slidesToScroll: 2,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2000,
                rtl: plugins.rtltrue,
                arrows: false,
                dots: true,
                responsive: [{
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });
        }
        // brand carousel
        if (plugins.brandCarousel.length) {
            plugins.brandCarousel.slick({
                mobileFirst: false,
                slidesToShow: 8,
                slidesToScroll: 1,
                infinite: false,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: false,
                dots: true,
                variableWidth: true,
                rtl: plugins.rtltrue,
                responsive: [{
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 6
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 5
                    }
                }]
            });
        }

        // category carousel
        if (plugins.categoryCarousel.length) {
            plugins.categoryCarousel.slick({
                mobileFirst: false,
                slidesToShow: parseInt(ajax_bannerslider.slides_to_show),
                slidesToScroll: parseInt(ajax_bannerslider.slides_to_scroll),
                infinite: JSON.parse(ajax_bannerslider.infinite),
                autoplay: JSON.parse(ajax_bannerslider.autoplay),
                autoplaySpeed: parseInt(ajax_bannerslider.autoplay_speed),
                arrows: JSON.parse(ajax_bannerslider.arrows),
                dots: JSON.parse(ajax_bannerslider.dots),
                responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });
        }

        // post carousel
        if (plugins.postCarousel.length) {
            plugins.postCarousel.slick({
                mobileFirst: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                autoplay: false,
                rtl: plugins.rtltrue,
                arrows: true,
                dots: false
            });
        }

        // END CAROUSELS

        // slide menu
        if (plugins.slideNav.length) {
            var $slideNav = plugins.slideNav,
                toggler = '.js-navbar-toggle',
                $slidemenu = $('#slidemenu'),
                menuwidth = '100%',
                slidewidth = '270px',
                menuneg = '-100%',
                slideneg = '-270px';
            $slideNav.after($('<div id="navbar-height-col"></div>'));
            $slideNav.on("click", toggler, function (e) {
                var $this = $(this);
                var $heightCol = $('#navbar-height-col');
                var selected = $this.hasClass('slide-active');
                e.preventDefault();
                $slidemenu.stop().animate({
                    left: selected ? menuneg : '0px'
                });
                $heightCol.stop().animate({
                    left: selected ? slideneg : '0px'
                });
                $(toggler).toggleClass('slide-active', !selected);
                $('body').toggleClass('slide-active');
                $slidemenu.toggleClass('slide-active');
                $shiftMenu.toggleClass('slide-active');
            });
        }

        // post isotope
        if (plugins.postGallery.length) {
            var $postgallery = plugins.postGallery;
            $postgallery.imagesLoaded(function () {
                setPostSize();
            });
            $postgallery.isotope({
                itemSelector: '.blog-post',
                masonry: {
                    gutter: 30,
                    columnWidth: '.blog-post:not(.doubleW)'
                }
            });
        }

        // post more ajax load
        if (plugins.postMoreLink.length) {
            var $postMoreLink = plugins.postMoreLink,
                $postPreload = $('#postPreload'),
                $postLoader = $('#moreLoader');

            $postMoreLink.on('click', function () {
                var target = $(this).attr('data-load');
                $postLoader.addClass('visible');
                $(this).hide();
                $.ajax({
                    url: target,
                    success: function (data) {
                        setTimeout(function () {
                            $postPreload.append(data);
                            $postLoader.removeClass('visible');
                        }, 500);
                    }
                });
            })
        }

        if (windowWidth < 769) {
            startCarousel();
        } else {
            if (plugins.iconSquared.length) {
                equalHeight(".text-icon-squared", ".title", ".text");
            }
            if (plugins.testimonialsGrid.length) {
                equalHeight(".testimonials-grid .testimonials-item", ".title", ".text");
            }
        }

        toggleNavbarMethod(windowWidth);

        // Resize window events
        $window.resize(function () {
            var windowWidth = window.innerWidth || $window.width();
            if (windowWidth < 992) {
                startCarousel();
                $fullHeight.height('');
            }
            if (windowWidth > 991 && $navbarToggle.is(':hidden')) {
                $shiftMenu.removeClass('slide-active');
            }
            if (plugins.iconSquared.length) {
                $(".text-icon-squared, .text-icon-squared .title, .text-icon-squared .text").each(function () {
                    $(this).css({
                        'height': ''
                    });
                })

            }
            if (plugins.testimonialsGrid.length) {
                $(".testimonials-grid .testimonials-item, .testimonials-grid .testimonials-item .title, .testimonials-grid .testimonials-item .text").each(function () {
                    $(this).css({
                        'height': ''
                    });
                })
            }
        });

        $(window).resize(debouncer(function (e) {
            var windowWidth = window.innerWidth || $window.width();

            if (windowWidth > 991) {
                var windowH=$(window).height();
               
                if($(plugins.mainSlider).hasClass('mainslider2')){
                    $fullHeight.height(windowH - $('.page-header').height());
                }else{
                    $fullHeight.height(windowH);
                }
                //$fullHeight.height($(window).height());
                if (plugins.iconSquared.length) {
                    equalHeight(".text-icon-squared", ".title", ".text");
                }
                if (plugins.testimonialsGrid.length) {
                    equalHeight(".testimonials-grid .testimonials-item", ".title", ".text");
                }
            }
            if (plugins.postGallery.length) {
                setPostSize();
            }
            $dropdown.removeClass('opened');
            toggleNavbarMethod(windowWidth);
        }))

    })

    $window.on('load', function () {

        var windowWidth = window.innerWidth || $window.width();

        $('#loader-wrapper').fadeOut(500);

        // lazy loading effect
        if (plugins.animation.length) {
            onScrollInit(plugins.animation, windowWidth);
        }


    });


    $window.on('load', function () {
        var windowWidth = window.innerWidth || $window.width();
        // lazy loading effect
        if (plugins.animation.length) {
            onScrollInit(plugins.animation, windowWidth);
        }
        if (plugins.googleMapFooter.length) {
            //createMapFooter(plugins.googleMapFooter, googleMapOption.zoom, googleMapOption.latitude, googleMapOption.longitude, googleMapOption.markers);
        }
    });


    /* ---------------------------------------------
     Functions
     --------------------------------------------- */

    // Set equal height to block
    function equalHeight(block) {

        var wrapWidth = $(block).parent().width(),
            blockWidth = $(block).width(),
            wrapDivide = Math.floor(wrapWidth / blockWidth),
            cellArr = $(block);
        for (var arg = 1; arg <= arguments.length; arg++) {
            for (var i = 0; i <= cellArr.length; i = i + wrapDivide) {
                var maxHeight = 0,
                    heightArr = [];
                for (var j = 0; j < wrapDivide; j++) {
                    heightArr.push($(cellArr[i + j]).find(arguments[arg]));
                    if (heightArr[j].outerHeight() > maxHeight) {
                        maxHeight = heightArr[j].outerHeight();
                    }
                }
                for (var counter = 0; counter < heightArr.length; counter++) {
                    $(cellArr[i + counter]).find(arguments[arg]).outerHeight(maxHeight);
                }
            }
        }
    }

    // Slide mobile info
    function slideMobileInfo(toggle, slide) {
        var $toggle = $(toggle),
            $slide = $(slide);
        $toggle.on("click", function (e) {
            $(this).parent().toggleClass('open');
            $slide.slideToggle(300).toggleClass('open');
        })
    }

    // Scroll Slider
    function scrollSlider(button) {
        var $button = $(button);
        $button.on('click', function (e) {
            $('body,html').animate({
                scrollTop: $('#mainSlider').offset().top + $('#mainSlider').height() - 300
            }, 1000);
            e.preventDefault();
        });
    }
    // Back to top
    function backToTop(button) {
        var $button = $(button);
        $(window).on('scroll', function () {
            if ($(this).scrollTop() >= 500) {
                $button.addClass('visible');
            } else {
                $button.removeClass('visible');
            }
        });
        $button.on('click', function () {
            $('body,html').animate({
                scrollTop: 0
            }, 1000);
        });
    }

    // Slider Animation
    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
            var $this = $(this);
            var $animationDelay = $this.data('delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function () {
                $this.removeClass($animationType);
            });
        });
    }

    // datepicker
    if ($('.datetimepicker').length) {
        $('.datetimepicker').datetimepicker({
            format: 'DD/MM/YYYY',
            icons: {
                time: 'icon icon-clock',
                date: 'icon icon-calendar',
                up: 'icon icon-arrow_up',
                down: 'icon icon-arrow_down',
                previous: 'icon icon-arrow-left',
                next: 'icon icon-arrow-right',
                today: 'icon icon-today',
                clear: 'icon icon-trash',
                close: 'icon icon-cancel-music'
            }
        });
    }
    if ($('.timepicker').length) {
        $('.timepicker').datetimepicker({
            format: 'LT',
            icons: {
                time: 'icon icon-clock',
                up: 'icon icon-arrow_up',
                down: 'icon icon-arrow_down',
                previous: 'icon icon-arrow-left',
                next: 'icon icon-arrow-right'
            }
        });
    }
    // Time Out Resize
    function debouncer(func, timeout) {
        var timeoutID, timeout = timeout || 500;
        return function () {
            var scope = this,
                args = arguments;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function () {
                func.apply(scope, Array.prototype.slice.call(args));
            }, timeout);
        }
    }

    // Count To
    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

    // Set Post Size fo masonry
    function setPostSize() {
        var windowW = window.innerWidth || $window.width(),
            itemsInRow = 1;
        if (windowW > 1199) {
            itemsInRow = 3;
        } else if (windowW > 767) {
            itemsInRow = 3;
        } else if (windowW > 480) {
            itemsInRow = 1;
        }
        var $postgallery = plugins.postGallery;
        var containerW = $postgallery.parent('.container').width() - 60,
            galleryW = containerW / itemsInRow;

        $postgallery.find('.blog-post').each(function () {
            if (windowW > 767) {
                if ($(this).hasClass('doubleW')) {
                    $(this).css({
                        width: galleryW * 2 + 30 + 'px',
                    });
                } else {
                    $(this).css({
                        width: galleryW + 'px'
                    });
                }
            } else {
                $(this).css({
                    width: galleryW + 60 + 'px'
                });
            }
        });

        setTimeout(function () {
            $('.slick-initialized').slick('setPosition');
            $postgallery.isotope('layout');
        }, 100);
    }

    // sticky header
    $.fn.stickyHeader = function () {
        var $header = this,
            $body = $('body'),
            headerOffset,
            stickyH;

        function setHeigth() {
            $(".stspace").remove();
            $header.removeClass('animated is-sticky fadeIn');
            $body.removeClass('hdr-sticky');
            headerOffset = $('#slidemenu', $header).offset().top;
            stickyH = $header.height() + headerOffset;
        }
        setHeigth();
        var prevWindow = window.innerWidth || $(window).width()
        $(window).on('resize', function () {
            var currentWindow = window.innerWidth || $(window).width();
            if (currentWindow != prevWindow) {
                setHeigth()
                prevWindow = currentWindow;
            }
        });
        $(window).scroll(function () {
            //if (prevWindow < 992) return;

            var st = getCurrentScroll();
            if (st > headerOffset) {
                if (!$(".stspace").length && !$body.hasClass('home')) {
                    $header.after('<div class="stspace"></div>');
                    $(".stspace").css({
                        'height': $header.height() + 'px'
                    });
                }
                $header.addClass('is-sticky animated fadeIn');
            } else {
                $(".stspace").remove();
                $header.removeClass('animated is-sticky fadeIn');
            }
        });

        function getCurrentScroll() {
            return window.pageYOffset || document.documentElement.scrollTop;
        }
    }

    if (plugins.stickyHeader.length) {
        $(plugins.stickyHeader).stickyHeader();
    }


    // Mobile Only carousel initialization
    function slickMobileServices2(carousel) {
        carousel.not('.slick-initialized').slick({
            mobileFirst: true,
            rows: 3,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: false,
            dots: true,
            adaptiveHeight: true,
            pauseOnHover: false,
            pauseOnFocus: false,
            swipe: false,
            responsive: [{
                breakpoint: 767,
                settings: "unslick",
            }]
        });
    }

    function slickMobileServices(carousel) {
        carousel.not('.slick-initialized').slick({
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: false,
            dots: true,
            adaptiveHeight: true,
            responsive: [{
                breakpoint: 767,
                settings: "unslick",
            }]
        });
    }

    // Mobile Only carousel
    function startCarousel() {
        if (plugins.servicesCarousel.length) {
            slickMobileServices(plugins.servicesCarousel);
        }
        if (plugins.servicesCarousel2.length) {
            slickMobileServices2(plugins.servicesCarousel2);
        }
    }

    // Navigation dropdown menu
    function toggleNavbarMethod(windowWidth) {
        var $dropdownLink = $(".dropdown > a, .dropdown-submenu > a");
        var $dropdown = $(".dropdown, .dropdown-submenu");
        var $dropdownCaret = $(".dropdown > a > .ecaret, .dropdown-submenu > a > .ecaret");
        $dropdownLink.on('click.toggleNavbarMethod', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var url = $(this).attr('href');
            if (url)
                $(location).attr('href', url);
        });
        if (windowWidth < 992) {
            $dropdown.unbind('.toggleNavbarMethod');
            $dropdownCaret.unbind('.toggleNavbarMethod');
            $dropdownCaret.on('click.toggleNavbarMethod', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var $li = $(this).parent().parent('li');
                if ($li.hasClass('opened')) {
                    $li.find('.dropdown-menu').first().stop(true, true).slideUp(0);
                    $li.removeClass('opened');
                } else {
                    $li.find('.dropdown-menu').first().stop(true, true).slideDown(0);
                    $li.addClass('opened');
                }
            })
        }
    }
    // collapsed text
    $(".view-more-link").on('click', function (e) {
        var $this = $(this);
        var $target = $($this.attr('href'));
        if ($this.hasClass('opened')) {
            $this.removeClass('opened');
            $('.view-more-mobile', $target).stop(true, true).fadeOut();
        } else {
            $this.addClass('opened');
            $('.view-more-mobile', $target).stop(true, true).fadeIn();
        }
        e.preventDefault();
    })



    modalPopup('.modal-popup-link');
    popupForm('.form-popup-link');

    // modal popup
    function modalPopup(drop) {
        if ($(drop).length) {
            $(drop).magnificPopup({
                type: 'inline',
                midClick: true,
                removalDelay: 300,
                mainClass: 'mfp-fade',
                closeMarkup: '<button title="%title%" class="mfp-close" style="position: absolute; top: 30px; right: -15px">' + ajax_object.close_text + '</button>'
            });
        }
    }
    // dropdown form
    function popupForm(link) {
        if ($(link).length) {
            $(link).on('click', function (e) {
                //var $popup = $(this).next();
                var $popup = $(this).parent().find('.form-popup');
                var diff = $(window).width() - $popup.offset().left - $popup.width();
                if (diff < 0) {
                    $popup.css({
                        'margin-left': -$popup.width() * .5 + diff - 10
                    })
                }
                if ($popup.offset().left < 0) {
                    $popup.css({
                        'margin-left': -$popup.width() * .5 - $popup.offset().left + 10
                    })
                }
                $popup.toggleClass('opened');
                $(this).toggleClass('active');
                e.preventDefault();
            })
            $('.form-popup-close').on('click', function (e) {
                var $popup = $(this).closest('.form-popup');
                $popup.toggleClass('opened');
                $popup.prev().removeClass('active');
                $(this).toggleClass('active');
                $popup.css({
                    'margin-left': ''
                })
                e.preventDefault();
            })
            $(document).on('click', function (event) {
                if (!$(event.target).closest('.form-popup-wrap').length) {
                    if ($('.form-popup').hasClass("opened")) {
                        $('.form-popup').prev().removeClass('active');
                        $('.form-popup').removeClass('opened');
                        $('.form-popup').css({
                            'margin-left': ''
                        })
                    }
                }
            })
        }
    }
    var windowWidth = window.innerWidth || $window.width();
    toggleNavbarMethod(windowWidth);
    slideMobileInfo('.js-info-toggle', '.header-info-mobile');
    headerSearch('#search-button', '#hide-search-input-container', '#search-input-container');
    toggleCart('.header-cart', '.header-cart-dropdown');
    mobileClickBanner(windowWidth);
    backToTop('.back-to-top');
    scrollSlider('.js-scroll-bottom');

    // Header Search
    function headerSearch(open, close, container) {
        var $container = $(container);
        $(open).on('click', function (e) {
            if ($container.hasClass('hdn')) {
                e.preventDefault();
                $container.removeClass('hdn')
                return false;
            }
        });

        $(close).on('click', function (e) {
            e.preventDefault();
            $container.addClass('hdn')
            return false;
        });
    }

    $(".cart .input-text.qty.text").spinner({
        spin: function (event, ui) {
            $('.woocommerce-cart-form input[name="update_cart"]').prop('disabled', false);
        }
    });
    $(document.body).on('updated_cart_totals', function () {
        $(".cart .input-text.qty.text").spinner({
            spin: function (event, ui) {
                $('.woocommerce-cart-form input[name="update_cart"]').prop('disabled', false);
            }
        });
    });
    $('.header-cart').on('click', '.prd-sm-delete', function () {
        var id = $(this).data('product_id')
        var qty = $(this).data('qty')
        var cid = $(this).data('cid')
        $.ajax({
            type: "POST",
            url: ajax_object.ajax_url,
            data: {
                action: 'remove_item_from_cart', product_id: id, cid: cid,security:  ajax_object.ajax_nonce_removecart,
            },
            success: function (res) {
                if (res.fragments) {
                    $("body").trigger("wc_fragment_refresh")
                }

            }
        });
    })

    // Header Cart dropdown menu
    function toggleCart(cart, drop) {
        $(document).on('click', cart, function () {
            $(cart).toggleClass('opened');
        });
        $(document).on('click', drop, function () {
            $(cart).toggleClass('opened');
        });
        $(document).on('click', function (e) {

            if (!$(e.target).closest(cart).length && !$(e.target).closest(drop).length) {

                if ($(cart).hasClass("opened")) {
                    $(cart).removeClass('opened');
                }
            }
        })
    }



    function mobileClickBanner(wW) {
        if (wW < 768) {
            $(".banner-under-slider").on('click', function (e) {
                var $this = $(this);
                var target = $this.find('.action .btn').attr('href');
                if (target)
                    $(location).attr('href', target);
                e.preventDefault();
            })
        } else {
            $(".banner-under-slider").unbind('click');
        }
    }

    // Scrolls to #link
    $('.scrollto').on('click',function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href'));
        if ($target.length) {
            $('html,body').animate({
                scrollTop: $target.offset().top
            }, 'slow');
        }
    });

    // Lazy Load animation
    function onScrollInit(items, wW) {
        if (wW > 991) {
            if (!$('body').data('firstInit')) {
                items.each(function () {
                    var $element = $(this),
                        animationClass = $element.attr('data-animation'),
                        animationDelay = $element.attr('data-animation-delay');
                    $element.removeClass('no-animate');
                    $element.css({
                        '-webkit-animation-delay': animationDelay,
                        '-moz-animation-delay': animationDelay,
                        'animation-delay': animationDelay
                    });
                    var trigger = $element;
                    trigger.waypoint(function () {
                        $element.addClass('animated').addClass(animationClass);
                        if ($element.hasClass('hoveranimation')) {
                            $element.on("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function () {
                                $(this).removeClass("animated").removeClass("animation").removeClass(animationClass);
                            });
                        }
                    }, {
                            triggerOnce: true,
                            offset: '90%'
                        });
                });
                $('body').data('firstInit', true);
            }
        } else {
            items.each(function () {
                var $element = $(this);
                $element.addClass('no-animate')
            })
        }
    }

    $('.calendar_wrap').addClass('calendar');
    $('.calendar_wrap table caption').addClass('calendar__header');
    $('.calendar_wrap table #today').addClass('selected');
    $('.widget ul, .single_pg_cont ul').addClass('category-list');
    $('.widget select,.widget input[type="text"],.widget input[type="email"],.widget input[type="password"]').addClass('form-control');
    $('.widget button, .widget input[type="submit"]').addClass('btn');
    $('.single_pg_cont table').addClass('table');



    if (testimonialsLength > 3) {
        jQuery('.view-more-testimonials').show();
    }
    jQuery('.view-more-testimonials').on('click',function () {
        jQuery('.view-more-testimonials').hide()
        jQuery('.testimonial-loader').show()
        setTimeout(function () {
            var i = 0
            var j = 0
            jQuery('.testimonials-item').each(function () {
                if (jQuery(this).is(':visible')) {
                    j++;
                } else {
                    if (i < target) {
                        var h = jQuery('.testimonials-item:first-child').find('.text').height()
                        jQuery(this).show()
                        jQuery(this).find('.text').height(h)
                        i++
                    }
                }
            })
            if (testimonialsLength == i + j) {
                jQuery('.testimonial-loader').hide()
                jQuery('.view-more-testimonials').hide()
            } else {
                jQuery('.testimonial-loader').hide()
                jQuery('.view-more-testimonials').show()

            }
        }, 2000);

    })


    $('body').on('click', '.service-cart', function () {
        var id = $(this).data('product_id');
        var selectorid = $(this).attr('id');
        var quantity = 1;
        var price = $(this).attr('data-price');
        var service = $(this).attr('data-service-title');
        var $this = $(this);
        if (price == 0) {
            $('[data-target="' + selectorid + '"]').nextAll('.control-indicator').addClass('shadow')
            return false;
        }
        $($this).prev('.spinner').show();
        $this.hide();
        $('[data-target="' + selectorid + '"]').nextAll('.control-indicator').removeClass('shadow')
        $.ajax({
            type: "POST",
            url: ajax_object.ajax_url,
            data: {
                action: 'service_add_to_cart', product_id: id, price: price, quantity: quantity, service: service,security:  ajax_object.ajax_nonce_servicecart,
            },
            success: function (res) {
                if (res = 'success')
                    $("body").trigger("wc_fragment_refresh")
                $this.show();
                $($this).prev('.spinner').hide();
            }
        });
    })

    $('body').on('change', '.service_check', function () {
        var target = $(this).data('target'),
            price = $(this).data('price'),
            title = $(this).data('title'),
            send_price = parseInt($('#' + target).attr('data-price')),
            send_title = $('#' + target).attr('data-service-title').replace(/(^,)|(,$)/g, "");
        price = price.toString().replace('.', '');
        price = parseInt(price);
        if ($(this).is(":checked")) {
            var new_price = parseInt(send_price + price)
            var new_title = send_title + ',' + title;
            $(this).nextAll('.control-indicator').removeClass('shadow')
        } else {
            if (send_price > price) {
                var new_price = parseInt(send_price - price)
            } else {
                var new_price = 0
            }
            var new_title = send_title.replace(title, '');
        }
        $('#' + target).attr('data-price', new_price);
        $('#' + target).attr('data-service-title', new_title);
    })






})(jQuery);
jQuery(document).ready(function () {
    // obj.init();
    //mutation event for rtl
    if (jQuery('body').hasClass('rtl')) {
        var $targets = document.querySelectorAll('.vc_row[data-vc-full-width]');
        NodeList.prototype.forEach = Array.prototype.forEach;
        $targets.forEach(function ($target) {
            var $config = { attributes: true, childList: true, characterData: true };
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.attributeName == 'style' && $target.style.left.indexOf('-') != -1) {
                        var $right = $target.style.left;
                        $target.style.left = 'auto';
                        $target.style.right = $right;
                    }
                });
            });
            observer.observe($target, $config);
        });
    }
});