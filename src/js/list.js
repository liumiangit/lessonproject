require(['config'],function(){
    require(['jquery','common'],function($,com){
        $('#head').load('base.html .header');
        $('#foot').load('base.html .foot');
    })
})