require(['config'],function(){
    require(['jquery'],function(){
        $('#head').load('base.html .header');
        $('#foot').load('base.html .foot');
        //获取url中的参数
        var params = location.search.substring(1).split('&');
        //获取list页面中对应的节点
        $img = $('.show ul li img');
        console.log($img);
        console.log(params)
        params.forEach(function(item){
            var arr=item.split('=');
            switch(arr[0]){
                case 'img':
                $img.each(function(item,idex){
                    item.src = arr[1][idex];
                })
                break;
            }
        })
    })
})