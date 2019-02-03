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
    $('.gnb>ul>li>a').on('mouseenter focus', function(){
        $('.gnb .sub').removeClass('on');
        $(this).next().addClass('on');
    });
    $('.gnb').on('mouseleave', function(){
        $('.gnb .sub').removeClass('on');        
    });
});
//메인비주얼 슬라이드 동작
$(function(){
    $('.main_visual .img_des a').on('mouseover focus', function(){
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
//찜하기 동작
$(function(){
    $('.content_box .heart').on('click', function(){
        $(this).toggleClass('on');
    });
});
//기회 더 보기 동작
$(function(){
    var length = $('.content_list_wrap .content_box').length;
    var half = length / 2;
    var now_show = 0;
    $('.content_list_wrap .content_box').hide();
    for(i=0;i<half;i++){
        $('.content_list_wrap .content_box').eq(i).show();
        now_show = half-1;
    }
    $('.content_more_wrap a').on('click', function(){
        if(now_show >= (length-1)) return false;
        else{    
            for(i=1;i<=5;i++){
                var now_index = 0;
                now_index = i+now_show;
                $('.content_list_wrap .content_box').eq(now_index).show();
            }
            now_show = now_index;
        }
    });
});
//지원정책 서브메뉴 동작
$(function(){
    $('.select_title').on('click', function(){
        $(this).next().toggleClass('on');
    });
    $('.area_all').on('click', function(){
        $(this).next().toggleClass('hidden_area_wrap');
    });
    $('.category_wrap>.mo').on('click', function(){
        $(this).next().toggleClass('on');
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
        $('.side_nav_wrap').before('<div id="mask"></div>');
    });
    $('.close_btn').on('click', function(){
        $('.side_nav').animate({'margin-right': '-60%'}, 500);
        $('body').css({'overflow': 'auto', 'overflow-x': 'hidden'});
        $('#mask').remove();
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
//모바일 카테고리 스와이프
function setImageSwipe(selector, first) {
    var numSlide = $(selector).find('.cate_box').length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;
    var slideFirst = first;
    var startX = 0;
    var startY = 0;
    var delX = 0;
    var delY = 0;
    var offsetX = 0;
    var isDraggable = false;
    var direction = '';

    $(selector).find('.cate_box').each(function(i) {
        $(this).css({'left': (i * 100) + '%', 'display': 'block'});
    });
    showSlide(slideFirst);
    
    $(selector).find('.slide').on('touchstart', function(e) {
        $(this).css({'transition': 'none'});
        isDraggable = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        offsetX = $(this).position().left;
    });
    
    document.addEventListener('touchmove', function(e) {
        console.log(direction);
        if (isDraggable === false) return false;
        delX = e.touches[0].clientX - startX;
        delY = e.touches[0].clientY - startY;
        console.log(direction);
        if (direction === '') {
            if ((Math.abs(delX) > 5) && (Math.abs(delX) > Math.abs(delY))) {
                direction = 'horizon';
            } else if ((Math.abs(delY) > 5) && (Math.abs(delX) < Math.abs(delY))) {
                direction = 'vertical';
            } else {
                direction = '';
            }
        } else if (direction === 'horizon') {
            e.preventDefault();
            if ((delX > 0 && slideNow === 1) || (delX < 0 && slideNow === numSlide)) {
                delX = delX / 10;
            }
            $(selector).find('.slide').css({'left': (offsetX + delX) + 'px'});
        } else if (direction === 'vertical') {
            delX = 0;
        }
    }, {passive: false});
    
    $(document).on('touchend', function() {
        if (isDraggable === true) {
            if (delX < -50 && slideNow !== numSlide) {
                showSlide(slideNext);
            } else if (delX > 50 && slideNow !== 1) {
                showSlide(slidePrev);
            } else {
                showSlide(slideNow);
            }
            isDraggable = false;
            direction = '';
        }
    });

    function showSlide(n) {
        $(selector).find('.slide').css({'transition': 'left 0.5s', 'left': -((n - 1) * 26) + '%'});
        slideNow = n;
        slidePrev = (n - 1) < 1 ? numSlide : n - 1;
        slideNext = (n + 1) > numSlide ? 1 : n + 1;
    }
}  
