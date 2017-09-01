require(['config'],function(){
    require(['jquery','common'],function($,com){
        $('#head').load('base.html .header');
        $('#foot').load('base.html .foot');
        $spanlist = $('#head .header .nav .list span');
        $listul = $('#head .header .nav .list ul');
        $spanlist.on('mouseover',function(){
            $listul.fadeOut();
            console.log(66)
        })
    })
})