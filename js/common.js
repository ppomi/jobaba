/**
 * common.js
 */
$(document).on('click', 'a[href="#"]', function(e){
    e.preventDefault();
});
//검색어 순위
$(function(){
    var count = $('.rank_wrap>ul>li').length;
    var height = $('.rank_wrap>ul>li').height();
    function step(index){
        $('.rank_wrap>ul').delay(2000).animate({'top': -(height * index) + 'px'}, 500, function(){
            step((index + 1) % count);
        });
    }
    step(1);
});
//gnb메뉴 동작
$(function(){
    $('.gnb>ul>li>a').on('mouseenter', function(){
        $('.gnb .sub').removeClass('on');
        $(this).next().addClass('on');
    });
    $('.gnb').on('mouseleave', function(){
        $('.gnb .sub').removeClass('on');        
    });
});
//메인비주얼 슬라이드 동작
$(function(){
    $('.main_visual .img_des a').on('mouseover', function(){
        var index = $(this).parent().index();
        $('.main_visual .img_des a').removeClass('on');
        $(this).addClass('on');
        $('.main_visual .img_wrap a').removeClass('on');
        $('.main_visual .img_wrap a').eq(index).addClass('on');
    });
});
//최상단 이동, 최하단 이동 동작
$(function(){
    $(window).on('scroll', function(){
        var winTop = $(window).scrollTop();
        if(winTop > 500){
            $('#fixed_arrow .up').css({'opacity': '1'});
        }else{
            $('#fixed_arrow .up').css({'opacity': '0'});
        }
        if (($(document).height() - 1000) < winTop){
            $('#fixed_arrow .down').css({'opacity': '0'});
        } else {
            $('#fixed_arrow .down').css({'opacity': '1'});
        }
    });
    $('#fixed_arrow .up').on('click', function(){
        $('html, body').animate({'scrollTop': 0}, 400);
    });
    $('#fixed_arrow .down').on('click', function(){
        $('html, body').animate({'scrollTop': $(document).height()}, 400);
    });
});
//모바일 헤더 버튼 동작
$(function(){
    $('.mo_search_btn').on('click', function(){
        $('.search_con').slideToggle();
    });
    $('.sidebar_btn').on('click', function(){
        $('.mask').css({'display': 'block'});
        $('.side_nav').animate({'margin-right': '0%'}, 500);
        $('body').css({'overflow': 'hidden'});
    });
    $('.close_btn').on('click', function(){
        $('.side_nav').animate({'margin-right': '-60%'}, 500);
        $('.mask').css({'display': 'none'});
        $('body').css({'overflow-y': 'auto'});
    });
});
//모바일 메인비주얼 슬라이드 동작
$(function(){
    var slide = $('.mo_main_visual_wrap .img_wrap a');
    var dots = $('.mo_main_visual_wrap .img_dots');
    var numSlide = slide.length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;
    var slideStart = 1;
    var timerId = 0;
    var isTimerOn = true;
    var timerSpeed = 3000;
    var slideHeight = slide.height();
    slide.each(function(i) {
        $(this).css({'left': (i * 100) + '%', 'display': 'block'});
        dots.append('<a href="#" class="text_hide">' + (i + 1) + '번 슬라이드</a>\n');
    });
    $('.mo_main_visual_wrap').css({'height' : slideHeight});
    $(window).resize(function() {
        slide = $('.mo_main_visual_wrap .img_wrap a');
        slideHeight = slide.height();
        $('.mo_main_visual_wrap').css({'height' : slideHeight});
    });
    showSlide(slideStart);
    dots.find('a').on('click', function() {
        var index = $(this).index();
        showSlide(index + 1);
    });
    function showSlide(n) {
        clearTimeout(timerId);
        if (slideNow === 0) {
            slide.parent().css({'transition': 'none', 'left': -((n - 1) * 100) + '%'});
        } else {
            slide.parent().css({'transition': 'left 0.5s', 'left': -((n - 1) * 100) + '%'});
        }
        dots.find('a').removeClass('on');
        dots.find('a').eq(n - 1).addClass('on');
        slideNow = n;
        slidePrev = (n - 1) < 1 ? numSlide : n - 1;
        slideNext = (n + 1) > numSlide ? 1 : n + 1;
        if (isTimerOn === true) {
            timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
        }
    }
});
//모바일 카테코리 콘텐츠 동작
$(function(){
    $('.mo_cate_btn a').on('click', function(){
        var index = $(this).index();
        $('.mo_cate_btn a').removeClass('on');
        $(this).addClass('on');
        $('.cate_wrap').removeClass('on');
        $('.cate_wrap').eq(index).addClass('on');
    });
    $('.mo_cate_title a').on('click', function(){
        var index = $(this).index();
        if(index === 0){
            $(this).next().removeClass('on');
            $(this).addClass('on');
            $(this).parents('.cate_box_row').find('.cate_board_wrap').removeClass('on');
            $(this).parents('.cate_box_row').find('.cate_board_wrap:eq(0)').addClass('on');
        }else{
            $(this).prev().removeClass('on');
            $(this).addClass('on');
            $(this).parents('.cate_box_row').find('.cate_board_wrap').removeClass('on');
            $(this).parents('.cate_box_row').find('.cate_board_wrap:eq(1)').addClass('on');
        }
    });
});
