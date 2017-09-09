/* 
* @Author: liumian
* @Date:   2017-08-31 15:03:25
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-09 16:52:12
*/
require(['config'],function(){
    require(['jquery','common','jqueryui'],function($,com,jqui){
        $('#head').load('html/base.html .header')
        $('#foot').load('html/base.html .foot')
        require(['/js/base'],function(){

        // $slidenav.show();
        // $(window).on('scroll',function(){
        //     var scrolltop = $(window).scrollTop();
        //     if(scrolltop>500){
        //         $slidenav.hide(); 
        //     }else{
        //         $slidenav.show();
        //     }       
        // })      
        // tab切换
        $tabT = $('.tab .tab-t ul');
        $content = $('.tab-cnt .content');
        // 按钮第一个高亮，内容框第一个显示，其它掩藏
        $tabT.find('li').eq(0).addClass('active');
        $content.first().nextAll().hide();
        //绑定按钮事件
        $tabT.on('mouseover','li',function(){
            var  idx = $(this).index();
            //当前按钮高亮，其它失去高亮
            $(this).addClass('active').siblings('li').removeClass('active');
            //对应内容框显示。其它隐藏
            $content.eq(idx).show().siblings('.content').hide();
        })
        //skincare的隐藏和显示
        $skin= $('.skincare .skin3 ul');
        $conts = $skin.find('li .cont');
        $contsp = $skin.find('li .skin-tl')
        $conts.hide().eq(0).show();
        $contsp.eq(0).hide();
        $skin.on('mouseover','li',function(){
            var idx = $(this).index();
            for(var i=0;i<$conts.length;i++){
                if(i==idx){
                    $contsp.eq(i).hide();
                    $conts.eq(i).show();
                }else{
                    $contsp.eq(i).show();
                    $conts.eq(i).hide();
                }       
            }
            
        })
        //makeup的隐藏和显示
        $make= $('.makeup .skin3 ul');
        $contm = $make.find('li .cont');
        $contmp = $make.find('li .skin-tl')
        $contm.hide().eq(0).show();
        $contmp.eq(0).hide();
        $make.on('mouseover','li',function(){
            var idx = $(this).index();
            for(var i=0;i<$contm.length;i++){
                if(i==idx){
                    $contmp.eq(i).hide();
                    $contm.eq(i).show();
                }else{
                    $contmp.eq(i).show();
                    $contm.eq(i).hide();
                }       
            }
            
        })
        //perfume的隐藏和显示
        $perfume = $('.perfume .skin3 ul');
        $contp = $perfume.find('li .cont');
        $contpp = $perfume.find('li .skin-tl');
        $contp.hide().eq(0).show();
        $contpp.eq(0).hide();
        $perfume.on('mouseover','li',function(){
            var idx = $(this).index();
            for(var i=0;i<$contp.length;i++){
                if(i==idx){
                    $contp.eq(i).show();
                    $contpp.eq(i).hide();
                }else{
                    $contp.eq(i).hide();
                    $contpp.eq(i).show();
                }
            }
        })
        //men的显示和隐藏
        $men = $('.men .skin3 ul');
        $contmen = $men.find('.cont');
        $contmenp = $men.find('li .skin-tl');
        $contmen.hide().eq(0).show();
        $contmenp.eq(0).hide();
        $men.on('mouseover','li',function(){
            var idx = $(this).index();
            for(var i=0;i<$contmen.length;i++){
                if(i==idx){
                  $contmen.eq(i).show();
                  $contmenp.eq(i).hide();  
                }else{
                  $contmen.eq(i).hide();
                  $contmenp.eq(i).show();  
                }                
            }
        })
        //body&hair的显示和隐藏
        $body = $('.bodyhair .skin3 ul');
        $contb = $body.find('.cont');
        $contbp = $body.find('li .skin-tl');
        $contb.hide().eq(0).show();
        $contbp.eq(0).hide();
        $body.on('mouseover','li',function(){
            var idx = $(this).index();
            for(var i=0;i<$contb.length;i++){
                if(i==idx){
                  $contb.eq(i).show();
                  $contbp.eq(i).hide();  
                }else{
                  $contb.eq(i).hide();
                  $contbp.eq(i).show();  
                }                
            }
        })
        //返顶动画
        $topbtn = $('.topbtn');
        $(document).on('scroll',function(){
            var scrollTop = $(window).scrollTop();
            //当滚动到一定距离时，显示按钮
            if(scrollTop>800){
                $topbtn.fadeIn();
            }else{
                $topbtn.fadeOut();
            }
        })
        //绑定事件
        $topbtn.on('click',function(){
            $('html,body').stop().animate({'scrollTop':0},'slow');
        })

        //抢购倒计时
        $sales = $('.sales');
        $ptime = $('.sales ul li .time')
        var endTime = '2017/9/10 12:57:10';
        var end = Date.parse(endTime);
        var timer = setInterval(function(){
            var now = Date.now();
            var  offset = Math.floor((end-now)/1000);
            if(offset<=0){
                clearInterval(timer);
                $sales.hide();
            }
            var sec = offset%60;
            var min = Math.floor(offset/60)%60;
            var hour = Math.floor(offset/60/60);
            for(var i=0;i<$ptime.length;i++){
                $ptime.eq(i).find('span').eq(0).text(hour);
                $ptime.eq(i).find('span').eq(1).text(min);
                $ptime.eq(i).find('span').eq(2).text(sec); 
            }   
        },1000)
    })
    })
})
