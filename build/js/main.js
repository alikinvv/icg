var readyTrigger = false, // определяет оконачание анимации, если false - нельзя менять слайды
    scrollTrigger = true, // событие скролл запускает функцию один раз
    windowHeight = $(window).height(),
    windowWidth = $(window).width(),
    state = 0, // номер слайда на экране
    slideCount = $('.slide').length - 1; // количество слайдов

var purple = '#544594',
    green = '#019386';

var firstSlideSpeed = 1200;
var slideSpeed = 1000;
var backdropDelay = 347.8260;
var showNavigation = 900;
var hideNavigation = 430;


if(windowWidth > 1200) {
    // установка состояний элементов по умолчанию
    anime({
        targets: '.backdrop',
        translateX: '-100%',
        duration: 0
    });
    anime({
        targets: '.backdrop-two',
        translateX: '-100%',
        duration: 0
    });
    anime({
        targets: '.backdrop-three',
        translateX: '100%',
        duration: 0
    });
    anime({
        targets: '.logo',
        translateX: 123,
        duration: 0
    });
    anime({
        targets: '.logo__text',
        translateX: 100,
        opacity: 0,
        duration: 0
    });
    anime({
        targets: '#map',
        translateX: '100%',
        duration: 0
    });

    anime({
        targets: 'svg.icg mask path',
        x: 100,
        duration: 100
    })
}


// переход с первого слайда на нулевой
function gotoSlideZero() {
    var tl = anime.timeline();
    tl.add({
            targets: '.backdrop-two',
            translateX: '-100%',
            duration: slideSpeed,
            easing: 'easeInOutCubic',
        })
        .add({
            targets: '.backdrop',
            translateY: '0',
            duration: slideSpeed - 300,
            easing: 'easeInOutCubic',
        })
        .add({
            targets: '.logo',
            translateY: 0,
            duration: slideSpeed - 100,
            offset: '-=' + slideSpeed / 1.25,
            easing: 'easeInOutCubic',
            complete: function () {
                state = 0;
                scrollTrigger = true;
                readyTrigger = true;
                $('.down').fadeIn();
                console.log('state : ' + state);
                console.log('SHOW SLIDE #' + state);
            }
        })
    setTimeout(function () {
        $('.slide-1').removeClass('active');
    }, slideSpeed / 1.875);

    setTimeout(function() {
        $('.navigation').css('z-index','-1');
        updateNavigation();
    }, hideNavigation);

    setTimeout(function() {
        $('.navigation').css('z-index','-1').removeClass('right').addClass('left');
        updateNavigation();
    }, showNavigation);
}

// переход с нулевого слайда на первый
function gotoFirstSlide() {    
    $('.down').fadeOut();
    anime({
        targets: '.backdrop',
        translateY: '-100%',
        duration: slideSpeed,
        easing: 'easeInOutCubic',
    })
    anime({
        targets: '.logo',
        translateY: -2000,
        duration: slideSpeed + 100,
        easing: 'easeInOutCubic',
    })

    state++;

    setTimeout(function() {
        $('.navigation').css('z-index','-1');
        updateNavigation();
    }, hideNavigation);

    setTimeout(function() {
        $('.navigation').css('z-index','5').removeClass('left').addClass('right');
        updateNavigation();
    }, showNavigation);

    console.log('state : ' + state);
    console.log('SHOW SLIDE #' + state);

    setTimeout(function() {
        anime({
            targets: '.backdrop-two',
            translateX: '50%',
            duration: slideSpeed,
            easing: 'easeInOutCubic',
            complete: function () {
                scrollTrigger = true;
                readyTrigger = true;
            }
        })
        setTimeout(function () {
            $('.slide-' + state).addClass('active');
        }, slideSpeed / 2.307);
    }, slideSpeed / 1.5);
}

// переключение на следующий слайд
function nextSlide() {
    if (state % 2 == 1) { // переход на четный слайд
        state++;

        setTimeout(function() {
            $('.navigation').css('z-index','-1');
            updateNavigation();
        }, hideNavigation);

        setTimeout(function() {
            $('.navigation').css('z-index','5').removeClass('right').addClass('left');
            updateNavigation();
        }, showNavigation);

        console.log('state : ' + state);
        console.log('SHOW SLIDE #' + state);

        if (state == 4) {
            $('.backdrop-three').css('background', green);
        }

        anime({
            targets: '.backdrop-two',
            translateX: '-100%',
            duration: slideSpeed,
            easing: 'easeInOutCubic',
        })
        setTimeout(function () {
            $('.slide').removeClass('active');
        }, slideSpeed / 2);

        anime({
            targets: '.backdrop-three',
            translateX: '-50%',
            duration: slideSpeed,
            easing: 'easeInOutCubic',
            delay: backdropDelay,
            complete: function () {
                scrollTrigger = true;
                readyTrigger = true;
            }
        })
        setTimeout(function () {
            $('.slide-' + state).addClass('active');
        }, slideSpeed / 1.2344);
    } else if (state % 2 != 1) { // преход на нечетный слайд
        var position = '50%';
        state++;

        setTimeout(function() {
            $('.navigation').css('z-index','-1');
            updateNavigation();
        }, hideNavigation);

        setTimeout(function() {
            $('.navigation').css('z-index','5').removeClass('left').addClass('right');
            updateNavigation();
        }, showNavigation);

        console.log('state : ' + state);
        console.log('SHOW SLIDE #' + state);

        if (state == 3) {
            $('.backdrop-two').css('background', green);
        }

        if (state == 5) {
            $('.backdrop-two').css('background', purple);
            position = '0%';
        } else {
            position = '50%';
        }

        anime({
            targets: '.backdrop-three',
            translateX: '100%',
            duration: slideSpeed,
            easing: 'easeInOutCubic',
        })
        setTimeout(function () {
            $('.slide').removeClass('active');
        }, slideSpeed / 2);
        setTimeout(function () {
            if (state == 5) {
                $('.slide-5 .slide__col-left').css('z-index', 1);
            } else {
                $('.slide-5 .slide__col-left').css('z-index', '-1');
            }
        }, slideSpeed / 1.7857);

        anime({
            targets: '.backdrop-two',
            translateX: position,
            duration: slideSpeed,
            easing: 'easeInOutCubic',
            delay: backdropDelay,
            complete: function () {
                scrollTrigger = true;
                readyTrigger = true;
            }
        })
        setTimeout(function () {
            $('.slide-' + state).addClass('active');
        }, slideSpeed / 1.2344);
    }
}

// переход на предыдущий слайд
function prevSlide() {
    if (state % 2 == 1) { // переход на четный слайд        
        state--;

        setTimeout(function() {
            $('.navigation').css('z-index','-1');
            updateNavigation();
        }, hideNavigation);

        setTimeout(function() {
            $('.navigation').css('z-index','5').removeClass('right').addClass('left');
            updateNavigation();
        }, showNavigation);

        if (state == 2) {
            $('.backdrop-three').css('background', purple);
        }

        if (state == 4) {
            setTimeout(function () {
                $('.slide-5 .slide__col-left').css('z-index', '-1');
            }, 800);
        }

        console.log('state : ' + state);
        console.log('SHOW SLIDE #' + state);

        anime({
            targets: '.backdrop-two',
            translateX: '-100%',
            duration: slideSpeed,
            easing: 'easeInOutCubic',
        })
        setTimeout(function () {
            $('.slide').removeClass('active');
        }, slideSpeed / 1.9973);

        anime({
            targets: '.backdrop-three',
            translateX: '-50%',
            duration: slideSpeed,
            easing: 'easeInOutCubic',
            delay: backdropDelay,
            complete: function () {
                scrollTrigger = true;
                readyTrigger = true;
            }
        })
        setTimeout(function () {
            $('.slide-' + state).addClass('active');
        }, slideSpeed / 1.2344);
    } else if (state % 2 != 1) { // преход на нечетный слайд
        state--;

        setTimeout(function() {
            $('.navigation').css('z-index','-1');
            updateNavigation();
        }, hideNavigation);

        setTimeout(function() {
            $('.navigation').css('z-index','5').removeClass('left').addClass('right');
            updateNavigation();
        }, showNavigation);

        if (state == 1) {
            $('.backdrop-two').css('background', purple);
        }

        console.log('state : ' + state);
        console.log('SHOW SLIDE #' + state);

        anime({
            targets: '.backdrop-three',
            translateX: '100%',
            duration: slideSpeed,
            easing: 'easeInOutCubic',
        })
        setTimeout(function () {
            $('.slide').removeClass('active');
        }, slideSpeed / 2);

        anime({
            targets: '.backdrop-two',
            translateX: '50%',
            duration: slideSpeed,
            easing: 'easeInOutCubic',
            delay: backdropDelay,
            complete: function () {
                scrollTrigger = true;
                readyTrigger = true;
            }
        })
        setTimeout(function () {
            $('.slide-' + state).addClass('active');
        }, slideSpeed / 1.2344);

        
    }
}

// переход с последнего слайда с картой на предпоследний
function goToPenult() {
    state--;

    setTimeout(function() {
        $('.navigation').css('z-index','-1');
        updateNavigation();
    }, hideNavigation);

    setTimeout(function() {
        $('.navigation').css('z-index','5').removeClass('left').addClass('right');
        updateNavigation();
    }, showNavigation);

    console.log('state : ' + state);
    console.log('SHOW SLIDE #' + state);

    anime({
        targets: '#map',
        translateX: '100%',
        duration: slideSpeed,
        easing: 'easeInOutCubic',
    })
    setTimeout(function () {
        $('.slide').removeClass('active');
    }, slideSpeed / 2);

    setTimeout(function () {
        $('.slide-6 .slide__col-right').css('z-index', '-1');
    }, slideSpeed / 1.0344);

    setTimeout(function () {
        $('.slide-5 .slide__col-left').css('z-index', '1');
    }, 500);

    anime({
        targets: '.backdrop-two',
        translateX: '0',
        duration: slideSpeed,
        easing: 'easeInOutCubic',
        delay: slideSpeed / 1.875,
        complete: function () {
            scrollTrigger = true;
            readyTrigger = true;
        }
    })

    setTimeout(function () {
        $('.slide-' + state).addClass('active');
    }, slideSpeed / 1.0344);
}

// переход на последний слайд с картой
function goToMap() {
    state++;

    setTimeout(function() {
        $('.navigation').css('z-index','-1');
        updateNavigation();
    }, hideNavigation);

    setTimeout(function() {
        $('.navigation').css('z-index','5').removeClass('right').addClass('left');
        updateNavigation();
    }, showNavigation);

    console.log('state : ' + state);
    console.log('SHOW SLIDE #' + state);

    anime({
        targets: '.backdrop-two',
        translateX: '-100%',
        duration: slideSpeed,
        easing: 'easeInOutCubic',
    })
    setTimeout(function () {
        $('.slide').removeClass('active');
    }, slideSpeed / 2);
    setTimeout(function () {
        $('.slide-5 .slide__col-left').css('z-index', '-1');
    }, slideSpeed / 1.0344);

    setTimeout(function () {
        $('.slide-6 .slide__col-right').css('z-index', '1');
    }, slideSpeed / 2);
    setTimeout(function () {
        $('.contacts').css('opacity', '1');
        $('.dev').css('opacity', '1');
    }, slideSpeed / 0.9375);

    anime({
        targets: '#map',
        translateX: '0',
        duration: slideSpeed,
        easing: 'easeInOutCubic',
        delay: slideSpeed / 1.875,
        complete: function () {
            scrollTrigger = true;
            readyTrigger = true;
        }
    })
    setTimeout(function () {
        $('.slide-' + state).addClass('active');
    }, slideSpeed / 1.0344);
}

function updateNavigation() {
    $('.navigation li.active').removeClass('active');
    $('.navigation').find('li:nth-child(' + (state+1) + ')').addClass('active');
    console.log($('.navigation').find('li:nth-child(' + (state+1) + ')'));
}

$(window).load(function () {    
    if(windowWidth > 1200) {
        console.log('state : ' + state);
        console.log('SHOW SLIDE #' + state);

        var tl = anime.timeline();
        tl.add({
                targets: '.backdrop',
                translateX: 0,
                duration: firstSlideSpeed,
                easing: 'easeInOutCubic',
            })
            .add({
                targets: '.logo',
                translateX: 0,
                duration: firstSlideSpeed / 1.5,
                easing: 'easeInOutCubic',
            })
            .add({
                targets: '.logo__text',
                translateX: 0,
                opacity: 1,
                duration: firstSlideSpeed / 1.5,
                offset: '-=900',
                easing: 'easeInOutCubic',
                complete: function () {
                    anime({
                        targets: '.down img',
                        bottom: '+=-10',
                        duration: firstSlideSpeed / 1.5,
                        easing: 'easeInOutCubic',
                        direction: 'alternate',
                        loop: true,
                    })
                }
            })
            .add({
                targets: '.down',
                opacity: 1,
                duration: firstSlideSpeed / 1.5,
                easing: 'easeInOutCubic',
                offset: '-=500',
                begin: function () {
                    readyTrigger = true;
                    scrollTrigger = true;
                }
            })

        $('.down').click(function () {
            if (readyTrigger) {
                scrollTrigger = false;
                readyTrigger = false;
                gotoFirstSlide();
            }
        });

        var listItem = '<li></li>';
        $('body').append('<nav class="navigation left"></nav>');

        for(var i = 1; i <= $('.slide').length; i++) {
            $('.navigation').append('<li></li>');
        }

        $('.navigation').find('li:nth-child(' + state+1 + ')').addClass('active');
    }    
});

if(windowWidth > 1200) {
    $(window).bind('mousewheel DOMMouseScroll swipe', function (event) {        
        console.log("readyTrigger: " + readyTrigger);
        console.log('scrollTrigger: ' + scrollTrigger);
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) { // scroll up
            if ((readyTrigger && scrollTrigger && state == 1)) {
                scrollTrigger = false;
                readyTrigger = false;
                gotoSlideZero();
            } else if (readyTrigger && scrollTrigger && state == 6) {
                scrollTrigger = false;
                readyTrigger = false;
                setTimeout(function () {
                    $('.contacts').css('opacity', '0');
                    $('.dev').css('opacity', '0');
                }, 450);
                goToPenult();
            } else if (readyTrigger && scrollTrigger && state > 0) {
                scrollTrigger = false;
                readyTrigger = false;
                prevSlide();
            }
        } else {    // scroll down
            if (readyTrigger && scrollTrigger && state == 0) {
                scrollTrigger = false;
                readyTrigger = false;
                gotoFirstSlide();
            } else if (readyTrigger && scrollTrigger && state == 5) {
                scrollTrigger = false;
                readyTrigger = false;
                goToMap();
            } else if (readyTrigger && scrollTrigger && state < slideCount) {
                scrollTrigger = false;
                readyTrigger = false;
                nextSlide();
            }
        }
        
    });
}

if(windowWidth > 1200) {
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    };

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        
        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
                /* left swipe */
            } else {
                /* right swipe */
            }
        } else {
            if (yDiff > 0) {
                if (readyTrigger && scrollTrigger && state == 0) {
                    scrollTrigger = false;
                    readyTrigger = false;
                    gotoFirstSlide();
                } else if (readyTrigger && scrollTrigger && state == 5) {
                    scrollTrigger = false;
                    readyTrigger = false;
                    goToMap();
                } else if (readyTrigger && scrollTrigger && state < slideCount) {
                    scrollTrigger = false;
                    readyTrigger = false;
                    nextSlide();
                }            
            } else {
                if ((readyTrigger && scrollTrigger && state == 1)) {
                    scrollTrigger = false;
                    readyTrigger = false;
                    gotoSlideZero();
                } else if (readyTrigger && scrollTrigger && state == 6) {
                    scrollTrigger = false;
                    readyTrigger = false;
                    setTimeout(function () {
                        $('.contacts').css('opacity', '0');
                        $('.dev').css('opacity', '0');
                    }, 450);
                    goToPenult();
                } else if (readyTrigger && scrollTrigger && state > 0) {
                    scrollTrigger = false;
                    readyTrigger = false;
                    prevSlide();
                }
            }
        }
        /* reset values */
        xDown = null;

    }

}

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: {
            lat: 52.562876,
            lng: 13.359259
        },
        backgroundColor: '#fcfcfc',
        scrollwheel: false,
        fullscreenControl: true,
        fullscreenControlOptions: true,
        rotateControl: true,
        rotateControlOptions: true,
        tilt: 45,
        styles: [{
            elementType: 'geometry',
            stylers: [{
                color: '#ebe3cd'
            }]
        }, {
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#a39d90'
            }]
        }, {
            elementType: 'labels.text.stroke',
            stylers: [{
                color: '#f5f1e6'
            }]
        }, {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#c9b2a6'
            }]
        }, {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#dcd2be'
            }]
        }, {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#a39d90'
            }]
        }, {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{
                color: '#dfd2ae'
            }]
        }, {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{
                color: '#dfd2ae'
            }]
        }, {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#a39d90'
            }]
        }, {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{
                color: '#a5b076'
            }]
        }, {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#447530'
            }]
        }, {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{
                color: '#f5f1e6'
            }]
        }, {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{
                color: '#f5f1e6'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{
                color: '#f5f1e6'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#f5f1e6'
            }]
        }, {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{
                color: '#f5f1e6'
            }]
        }, {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#f5f1e6'
            }]
        }, {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#a39d90'
            }]
        }, {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{
                color: '#'
            }]
        }, {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#a39d90'
            }]
        }, {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{
                color: '#ebe3cd'
            }]
        }, {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{
                color: '#dfd2ae'
            }]
        }, {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{
                color: '#b9d3c2'
            }]
        }, {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#92998d'
            }]
        }]
    });
    function pinSymbol(color) {
        return {
            path: 'M45.268,0C20.272,0,0,20.181,0,45.07c0,5.63,1.086,10.996,2.963,15.967l0.066,0.165 c1.054,2.716,11.786,25.449,13.317,27.885l28.922,59.062l28.922-59.07c1.539-2.436,12.263-25.185,13.317-27.885l0.082-0.165h-0.025 c1.877-4.963,2.963-10.329,2.963-15.967C90.535,20.189,70.264,0,45.268,0z M45.268,67.572c-11.835,0-21.432-9.712-21.432-21.729 c0-11.984,9.597-21.679,21.432-21.679S66.7,33.86,66.7,45.844C66.7,57.86,57.103,67.572,45.268,67.572z',
            fillColor: color,
            fillOpacity: 1,
            scale: 0.5,
       };
    }
    
    var marker = new google.maps.Marker({
        map: map,
        position: {
            lat: 52.563049,
            lng: 13.354676
        },
        icon: pinSymbol("#000"),
    });
} // load map

google.maps.event.addDomListener(window, 'load', initMap);
