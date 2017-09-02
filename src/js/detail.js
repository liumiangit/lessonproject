require(['config'],function(){
    require(['jquery','common'],function(){
        $('#head').load('base.html .header');
        $('#foot').load('base.html .foot');
    })
})