/**
 * Created by Administrator on 2016/11/16.
 */
(function($) {                                    // Use $ as variable name
    $.fn.accordion = function (speed) {        // Return the jQuery selection
        this.on('click', '.accordion-control', function (e) {
            e.preventDefault();
            $(this)
                .next('.accordion-panel')
                .not(':animated')
                .slideToggle(speed);
        });
        return this;                                 // Return the jQuery selection
    };
}(jQuery));



$(function(){
    $('.menu').accordion(500);
    $('.accordion-panel h3,.accordion-panel p').on('click',function(){
        $(this).hide().slideDown();
    });

    $('.accordion-panel li').hide().each(function(index){
        $(this).slideDown(700*index);
    });

    $('.accordion-panel ul').on('click','li',function(){
        $(this).hide().fadeIn();
    });
})
