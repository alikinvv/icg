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

// переход с первого слайда на нулевой
function gotoSlideZero() {
    var tl = anime.timeline();
    tl.add({
            targets: '.backdrop-two',
            translateX: '-100%',
            duration: 1500,
            easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
        })
        .add({
            targets: '.backdrop',
            translateY: '0',
            duration: 1200,
            easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
        })
        .add({
            targets: '.logo',
            translateY: 0,
            duration: 1500,
            offset: '-=1200',
            easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
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
        easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
        complete: function () {
            nextSlide();
        }
    })
    anime({
        targets: '.logo',
        translateY: windowHeight * -1,
        duration: 1200,
        easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
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
            easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
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
            easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
        })
        setTimeout(function () {
            $('.slide').removeClass('active');
        }, 750);

        anime({
            targets: '.backdrop-three',
            translateX: '-50%',
            duration: 1500,
            easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
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
        state++;

        console.log('state : ' + state);
        console.log('SHOW SLIDE #' + state);

        if (state == 3) {
            $('.backdrop-two').css('background', green);
        }

        anime({
            targets: '.backdrop-three',
            translateX: '100%',
            duration: 1500,
            easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
        })
        setTimeout(function () {
            $('.slide').removeClass('active');
        }, 750);

        anime({
            targets: '.backdrop-two',
            translateX: '50%',
            duration: 1500,
            easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
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

        console.log('state : ' + state);
        console.log('SHOW SLIDE #' + state);

        anime({
            targets: '.backdrop-two',
            translateX: '-100%',
            duration: 1500,
            easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
        })
        setTimeout(function () {
            $('.slide').removeClass('active');
        }, 750);

        anime({
            targets: '.backdrop-three',
            translateX: '-50%',
            duration: 1500,
            easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
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
            easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
        })
        setTimeout(function () {
            $('.slide').removeClass('active');
        }, 750);

        anime({
            targets: '.backdrop-two',
            translateX: '50%',
            duration: 1500,
            easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
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

$(window).load(function () {
    console.log('state : ' + state);
    console.log('SHOW SLIDE #' + state);

    var tl = anime.timeline();
    tl.add({
            targets: '.backdrop',
            translateX: 0,
            duration: 1500,
            easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
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
                    targets: '.down',
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
        } else if (readyTrigger && scrollTrigger && state < slideCount) {
            scrollTrigger = false;
            readyTrigger = false;
            nextSlide();
        }
    }
});