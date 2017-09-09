require(['config'],function(){
    require(['jquery'],function($){
        require(['base'],function(){
            $('#head').load('base.html .header');
            $('#foot').load('base.html .foot')
        })
    })
})