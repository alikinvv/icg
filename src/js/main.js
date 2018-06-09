var readyTrigger = false, // определяет оконачание анимации, если false - нельзя менять слайды
    scrollTrigger = true, // событие скролл запускает функцию один раз
    windowHeight = $(window).height(),
    windowWidth = $(window).width(),
    state = 0, // номер слайда на экране
    slideCount = $('.slide').length - 1; // количество слайдов

var purple = '#544594',
    green = '#019386';

$(document).ready(function () {

});

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

// переход с первого слайда на нулевой
function gotoSlideZero() {
    var tl = anime.timeline();
    tl.add({
            targets: '.backdrop-two',
            translateX: '-100%',
            duration: 1500,
            easing: 'easeInOutCubic',
        })
        .add({
            targets: '.backdrop',
            translateY: '0',
            duration: 1200,
            easing: 'easeInOutCubic',
        })
        .add({
            targets: '.logo',
            translateY: 0,
            duration: 1500,
            offset: '-=1200',
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
    }, 800);
}

// переход с нулевого слайда на первый
function gotoFirstSlide() {
    $('.down').fadeOut();
    anime({
        targets: '.backdrop',
        translateY: '-100%',
        duration: 1500,
        easing: 'easeInOutCubic',
        complete: function () {
            nextSlide();
        }
    })
    anime({
        targets: '.logo',
        translateY: windowHeight * -1,
        duration: 1200,
        easing: 'easeInOutCubic',
    })
}

// переключение на следующий слайд
function nextSlide() {
    if (state == 0) { // переход с нулевого слайда на первый
        state++;

        console.log('state : ' + state);
        console.log('SHOW SLIDE #' + state);

        anime({
            targets: '.backdrop-two',
            translateX: '50%',
            duration: 1500,
            easing: 'easeInOutCubic',
            complete: function () {
                scrollTrigger = true;
                readyTrigger = true;
            }
        })
        setTimeout(function () {
            $('.slide-' + state).addClass('active');
        }, 650);
    } else if (state % 2 == 1) { // переход на четный слайд
        state++;

        console.log('state : ' + state);
        console.log('SHOW SLIDE #' + state);

        if (state == 4) {
            $('.backdrop-three').css('background', green);
        }

        anime({
            targets: '.backdrop-two',
            translateX: '-100%',
            duration: 1500,
            easing: 'easeInOutCubic',
        })
        setTimeout(function () {
            $('.slide').removeClass('active');
        }, 750);

        anime({
            targets: '.backdrop-three',
            translateX: '-50%',
            duration: 1500,
            easing: 'easeInOutCubic',
            delay: 800,
            complete: function () {
                scrollTrigger = true;
                readyTrigger = true;
            }
        })
        setTimeout(function () {
            $('.slide-' + state).addClass('active');
        }, 1450);
    } else if (state % 2 != 1) { // преход на нечетный слайд
        var position = '50%';
        state++;

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
            duration: 1500,
            easing: 'easeInOutCubic',
        })
        setTimeout(function () {
            $('.slide').removeClass('active');
        }, 750);
        setTimeout(function () {
            if (state == 5) {
                $('.slide-5 .slide__col-left').css('z-index', 1);
            } else {
                $('.slide-5 .slide__col-left').css('z-index', '-1');
            }
        }, 840);

        anime({
            targets: '.backdrop-two',
            translateX: position,
            duration: 1500,
            easing: 'easeInOutCubic',
            delay: 800,
            complete: function () {
                scrollTrigger = true;
                readyTrigger = true;
            }
        })
        setTimeout(function () {
            $('.slide-' + state).addClass('active');
        }, 1450);
    }
}

// переключение на предыдущий слайд
function prevSlide() {
    if (state % 2 == 1) { // переход на четный слайд        
        state--;

        if (state == 2) {
            $('.backdrop-three').css('background', purple);
        }

        if (state == 4) {
            setTimeout(function () {
                $('.slide-5 .slide__col-left').css('z-index', '-1');
            }, 1430);
        }

        console.log('state : ' + state);
        console.log('SHOW SLIDE #' + state);

        anime({
            targets: '.backdrop-two',
            translateX: '-100%',
            duration: 1500,
            easing: 'easeInOutCubic',
        })
        setTimeout(function () {
            $('.slide').removeClass('active');
        }, 750);

        anime({
            targets: '.backdrop-three',
            translateX: '-50%',
            duration: 1500,
            easing: 'easeInOutCubic',
            delay: 800,
            complete: function () {
                scrollTrigger = true;
                readyTrigger = true;
            }
        })
        setTimeout(function () {
            $('.slide-' + state).addClass('active');
        }, 1450);
    } else if (state % 2 != 1) { // преход на нечетный слайд
        state--;

        if (state == 1) {
            $('.backdrop-two').css('background', purple);
        }

        console.log('state : ' + state);
        console.log('SHOW SLIDE #' + state);

        anime({
            targets: '.backdrop-three',
            translateX: '100%',
            duration: 1500,
            easing: 'easeInOutCubic',
        })
        setTimeout(function () {
            $('.slide').removeClass('active');
        }, 750);

        anime({
            targets: '.backdrop-two',
            translateX: '50%',
            duration: 1500,
            easing: 'easeInOutCubic',
            delay: 800,
            complete: function () {
                scrollTrigger = true;
                readyTrigger = true;
            }
        })
        setTimeout(function () {
            $('.slide-' + state).addClass('active');
        }, 1450);
    }
}


function goToMap() {
    state++;

    console.log('state : ' + state);
    console.log('SHOW SLIDE #' + state);

    anime({
        targets: '.backdrop-two',
        translateX: '-100%',
        duration: 1500,
        easing: 'easeInOutCubic',
    })
    setTimeout(function () {
        $('.slide').removeClass('active');
    }, 750);
    setTimeout(function () {
        $('.slide-5 .slide__col-left').css('z-index', '-1');
    }, 1430);

    setTimeout(function () {
        $('.slide-6 .slide__col-right').css('z-index', '1');
    }, 750);

    anime({
        targets: '#map',
        translateX: '0',
        duration: 1500,
        easing: 'easeInOutCubic',
        delay: 800,
        complete: function () {
            scrollTrigger = true;
            readyTrigger = true;
        }
    })
    setTimeout(function () {
        $('.slide-' + state).addClass('active');
    }, 1450);
}

function goToPenult() {
    state--;

    console.log('state : ' + state);
    console.log('SHOW SLIDE #' + state);

    anime({
        targets: '#map',
        translateX: '100%',
        duration: 1500,
        easing: 'easeInOutCubic',
    })
    setTimeout(function () {
        $('.slide').removeClass('active');
    }, 750);

    setTimeout(function () {
        $('.slide-6 .slide__col-right').css('z-index', '-1');
    }, 1430);

    setTimeout(function () {
        $('.slide-5 .slide__col-left').css('z-index', '1');
    }, 750);

    anime({
        targets: '.backdrop-two',
        translateX: '0',
        duration: 1500,
        easing: 'easeInOutCubic',
        delay: 800,
        complete: function () {
            scrollTrigger = true;
            readyTrigger = true;
        }
    })

    setTimeout(function () {
        $('.slide-' + state).addClass('active');
    }, 1450);
}

$(window).load(function () {
    console.log('state : ' + state);
    console.log('SHOW SLIDE #' + state);

    var tl = anime.timeline();
    tl.add({
            targets: '.backdrop',
            translateX: 0,
            duration: 1500,
            easing: 'easeInOutCubic',
        })
        .add({
            targets: '.logo',
            translateX: 0,
            duration: 1000,
            easing: 'easeInOutCubic',
            //offset: '-=400'
        })
        .add({
            targets: '.logo__text',
            translateX: 0,
            opacity: 1,
            duration: 1000,
            offset: '-=900',
            easing: 'easeInOutCubic',
            complete: function () {
                anime({
                    targets: '.down img',
                    bottom: '+=-10',
                    duration: 1000,
                    easing: 'easeInOutCubic',
                    direction: 'alternate',
                    loop: true,
                })
            }
        })
        .add({
            targets: '.down',
            opacity: 1,
            duration: 1000,
            easing: 'easeInOutCubic',
            offset: '-=500',
            begin: function () {
                readyTrigger = true;
                scrollTrigger = true;
            }
        })

    $('.down').click(function () {
        console.log("readyTrigger: " + readyTrigger);
        console.log('scrollTrigger: ' + scrollTrigger);
        if (readyTrigger) {
            scrollTrigger = false;
            readyTrigger = false;
            gotoFirstSlide();
        }
    });
});

$(window).bind('mousewheel DOMMouseScroll', function (event) {
    console.log("readyTrigger: " + readyTrigger);
    console.log('scrollTrigger: ' + scrollTrigger);
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        if (readyTrigger && scrollTrigger && state == 1) {
            scrollTrigger = false;
            readyTrigger = false;
            gotoSlideZero();
        } else if (readyTrigger && scrollTrigger && state == 6) {
            scrollTrigger = false;
            readyTrigger = false;
            goToPenult();
        } else if (readyTrigger && scrollTrigger && state > 0) {
            scrollTrigger = false;
            readyTrigger = false;
            prevSlide();
        }
    } else {
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
    var marker = new google.maps.Marker({
        map: map,
        position: {
            lat: 52.563049,
            lng: 13.354676
        }
    });
} // load map

google.maps.event.addDomListener(window, 'load', initMap);
