$(document).ready(function () {

});

anime({targets: '.backdrop',translateX: '-100%',duration: 0});
anime({targets: '.backdrop-second',translateX: '-100%',duration: 0});
anime({targets: '.logo',translateX: 123,duration: 0});
anime({targets: '.logo__text',translateX: 100,opacity: 0,duration: 0});

function slideTwo() {
    var tl = anime.timeline();
    tl.add({
        targets: '.backdrop-second',
        translateX: '50%',
        duration: 1500,
        easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
    })
    setTimeout(function() {
        $('.slide-2').addClass('active');
    },700);
}

$(window).load(function () {
    var downTrigger = false,
        windowHeight = $(window).height(),
        windowWidth = $(window).width();

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
                downTrigger = true;
            }
        })

        $('.down').click(function() {
            if(downTrigger) {
                $(this).fadeOut();
                anime({
                    targets: '.backdrop',
                    translateY: '-100%',
                    duration: 1500,
                    easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
                    complete: function() {
                        slideTwo();
                    }
                })
                anime({
                    targets: '.logo',
                    translateY: windowHeight * -1,
                    duration: 1200,
                    easing: 'easeInOutCubic', //easeInOutCubic - 1500, easeInOutQuart -2000
                })
            }
        });
});