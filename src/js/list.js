require(['config'],function(){
    require(['jquery','common'],function($,com){
        $('#head').load('base.html .header');
        $('#foot').load('base.html .foot');
        $login = $('.head .sign ul li a');
        // 侧边栏动画      
        $selist = $('.selist');
        console.log($selist)
        $content = $selist.find('.content');
        $content.hide(); 
        $selist.on('click','.clickp',function(){
            $(this).next().slideDown()
        })
    })
})