require(['config'],function(){
    require(['jquery'],function($){
        $('#head').load('base.html .header');
        $('#foot').load('base.html .foot')           
        require(['base'],function(){
        })
    })
})