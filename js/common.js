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
        $('body').css({'overflow': 'auto'});
    });
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