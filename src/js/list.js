require(['config'],function(){
    require(['jquery'],function($){
        $('#head').load('base.html .header');
        $('#foot').load('base.html .foot');
        $login = $('.head .sign ul li a');
        //这里的require请求只是确保上面的节点已经全部加载
        require(['common'],function(){      
//---------------侧边栏动画------------------------------------------     
        $selist = $('.selist');
        $content = $selist.find('.content');
        $content.hide();
        var loop=true;
        $selist.on('click','.clickp',function(){
            if(loop){
               $(this).next().slideDown();
               loop=false; 
            }else{
               $(this).next().slideUp();
               loop=true; 
            }      
        })
//---------------通过api接口连接数据库，生成列表商品------------------
        var pageNo=1;
        var qty=24;
        var length;
        $goodlist = $('.goodlist');
        $page = $('.page');
        //pagepre
        $pagepre = $('.pagepre')
        $pno = $pagepre.find('.pno strong')
        $ptotal = $pagepre.find('.pno .strong')
        $total = $pagepre.find('.total strong')
        //进入第一次请求
        $.ajax({
                type:"get",
                url:"/api/goodslist.php",
                data:"pageNo="+pageNo+"&qty="+qty,
                success:function(res){
                    show(res);
                }
            }        
        )
        //列表下端换页按钮
        $page.on('click','span',function(){
            if($(this).hasClass('btnpre')){
                if(pageNo<=1){
                    return;
                }else{
                    pageNo--; 
                }              
            }else if($(this).hasClass('btnnext')){
                if(pageNo>=length){
                    return;
                }else{
                    pageNo++;
                }
            }else{
                pageNo = $(this).text();
            }
            $.ajax({
                type:"get",
                url:"/api/goodslist.php",
                data:"pageNo="+pageNo+"&qty="+qty,
                success:function(res){
                    show(res);
                }
            })
        })
        //列表前端按钮
        $pagepre.on('click','span',function(){
            //前端换页按钮
            if($(this).hasClass('prep')){
                if(pageNo<=1){
                    return;
                }else{
                    pageNo--; 
                }
            }else if($(this).hasClass('nextp')){
                if(pageNo>=length){
                    return;
                }else{
                    pageNo++;
                }
            }else{
                    return;
                }
            $.ajax({
                type:"get",
                url:"/api/goodslist.php",
                data:"pageNo="+pageNo+"&qty="+qty,
                success:function(res){
                    show(res);
                }
            })
        })
        //生成列表画面函数
        function show(res){
            var arr = JSON.parse(res);
            console.log(arr.data[0].img)
            //清空页码
            $page.text('');
            //生成页码按钮
            length = Math.ceil(arr.total/qty);
            for(var i=1;i<=length;i++){
                $span = $('<span/>');
                if(i==pageNo){
                    $span.addClass('btn');
                }
                $span.text(i);
                $page.append($span);
            }
            //生成上下页按钮
            $btnp = $('<span/>')
            $btnp.text('上一页')
            $btnp.addClass('btnpre')
            $btnn = $('<span/>')
            $btnn.text('下一页')
            $btnn.addClass('btnnext')
            $page.prepend($btnp)
            $page.append($btnn)
            //生成商品列表
            var ul = document.createElement('ul');
            ul.innerHTML = arr.data.map(function(item){
                return `<li data-id="${item.id}">
                            <a href="/html/detail.html?name=${item.name}&url=${item.url}&price=${item.price}&img=${item.img}"><img src="${item.url}"></a>
                            <p><a href="/html/detail.html?">${item.name}</a></p>
                            <p>￥<span>${item.price}</span><span>${item.sale}</span></p>
                            <div><button class="addcar">加入购物车</button><button>收藏</button></div>
                        </li>`
            }).join('')
            //清空商品显示区域
            $goodlist.text('');
            $goodlist.append(ul);
            //显示页码
            $pno.text(pageNo);
            $ptotal.text(length);
            $total.text(arr.total);
        }

//------------------------添加到购物车--------------------------------------
        var addul = document.querySelector('.box .goodlist');
        var now = new Date();
        now.setDate(now.getDate());
        var cookie = cookieget('carlist');
        var arr_goodlist;
        //判断cookie中为空的情况
        if(cookie == ''){
            arr_goodlist=[]
        }else{
            arr_goodlist=JSON.parse(cookie)
        }
        console.log(arr_goodlist)
        now.setDate(now.getDate()+10);
        //获取cookie中的数组
        function cookieget(name){
            // 先获取所有cookie
            var cookie = document.cookie;
            if(cookie.length === 0){
                return '';
            }

            // 拆分成数组
            cookie = cookie.split('; ');

            // 遍历cookie，找到想要的cookie值
            var res = '';
            cookie.forEach(function(item){
                var arr = item.split('=');

                if(arr[0] === name){
                    res = arr[1];
                }
            });
            return  res;
        }
        //给按钮绑定事件
        addul.onclick = function(e){
            e=e||window.event;
            var target=e.target||e.srcElement;
            if(target.className == 'addcar'){
                var tarli = target.parentNode.parentNode;
                var id = tarli.getAttribute('data-id');
                for(var i=0;i<arr_goodlist.length;i++){
                    //如果购物车中存在次商品
                    if(arr_goodlist[i].id==id){
                        arr_goodlist[i].qty++;
                        break;
                    }
                }
                //不存在此商品
                if(i===arr_goodlist.length){
                    var arr_h={
                        imgurl:tarli.children[0].children[0].src,
                        title:tarli.children[1].children[0].innerText,
                        price:tarli.children[2].children[0].innerText,
                        id:id,
                        qty:1
                    }
                    arr_goodlist.push(arr_h);                  
                } 
                document.cookie = 'carlist='+JSON.stringify(arr_goodlist)+';expires='+now.toUTCString();
                showcar(arr_goodlist);
            }
        }

//----------------------购物车中商品的生成-------------------------
        var carlist = document.querySelector('.search .shopcar ul');
        var str1 = document.querySelector('.shopcar .carbot .str1')
        var str2 = document.querySelector('.shopcar .carbot .str2')
        var goodtotal = document.querySelector('.shopcar .cart .goodtotal')
        showcar(arr_goodlist);
        function showcar(arr){
            var totalprice=0;
            var totalqty=0; 
            carlist.innerHTML = '';
            carlist.innerHTML = arr.map(function(item){
                totalprice+=item.price*item.qty;
                totalqty+=item.qty;
            return `<li data-id="${item.id}">
                        <a href=""><img src="${item.imgurl}"/></a>
                        <p class="listname">${item.title}</p>
                        <div class="carprice"><p><span class="pric">${item.price}</span><span class="qty">${item.qty}</span></p><button class="del">删除</button></div>
                    </li>`
            }).join('')
            console.log(totalprice)
        //显示商品数量
        str1.innerText=totalqty;
        //显示商品总价
        str2.innerText=totalprice;
        goodtotal.innerText=totalqty;
        }
//----------------------删除购物车内的商品--------------------------
        carlist.onclick = function(e){
            e=e||window.event;
            var target=e.target||e.srcElement;
            if(target.className=='del'){
                var tarli = target.parentNode.parentNode;
                // tarli.parentNode.removeChild(tarli);
                // 不需要删除节点，直接用删除后的cookie来覆盖
                var id = tarli.getAttribute('data-id');
                arr_goodlist.forEach(function(item,idx){
                    if(item.id==id){
                        arr_goodlist.splice(idx,1);
                    }
                })
            }
            showcar(arr_goodlist);
            document.cookie = 'carlist='+JSON.stringify(arr_goodlist)+';expires='+now.toUTCString();           
        }      
      })
    })
})
