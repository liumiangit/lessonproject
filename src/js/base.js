/* 
* @Author: Marte
* @Date:   2017-09-02 14:25:24
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-09 21:17:26
*/
require(['config'],function(){
    require(['jquery'],function($){
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
        // console.log(arr_goodlist)
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
    if(addul){
            addul.onclick = function(e){
                e=e||window.event;
                var target=e.target||e.srcElement;
                if(target.className == 'addcar'){
                    var tarli = target.parentNode.parentNode;
                    var id = tarli.getAttribute('data-id');
                    var cate = tarli.getAttribute('data-category');
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
                            cate:cate,
                            qty:1
                        }
                        arr_goodlist.push(arr_h);                  
                    } 
                    document.cookie = 'carlist='+JSON.stringify(arr_goodlist)+';expires='+now.toUTCString()+';path=/';
                    showcar(arr_goodlist);
                }
            }
        }
//----------------------小购物车中商品的生成-------------------------
        var carlist = document.querySelector('.search .shopcar ul');
        var str1 = document.querySelector('.shopcar .carbot .str1')
        var str2 = document.querySelector('.shopcar .carbot .str2')
        var goodtotal = document.querySelector('.shopcar .cart .goodtotal')
        showcar(arr_goodlist);
        function showcar(arr){
            var totalprice=0;
            var totalqty=0;
            //判断是否存在商品
            carlist.innerHTML = '';
            if(arr.length>0){
            carlist.innerHTML = arr.map(function(item){
                totalprice+=item.price*item.qty;
                totalqty+=item.qty;
            return `<li data-id="${item.id}">
                        <a href="/html/detail.html?${item.id}"><img src="${item.imgurl}"/></a>
                        <p class="listname">${item.title}</p>
                        <div class="carprice"><p><span class="pric">${item.price}</span><span class="qty">${item.qty}</span></p><button class="del">删除</button></div>
                    </li>`
            }).join('')
        }
        //显示商品数量
        str1.innerText=totalqty;
        //显示商品总价
        str2.innerText=totalprice;
        goodtotal.innerText=totalqty;
        }
//----------------------删除小购物车内的商品--------------------------
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
                        return;
                    }
                })
            }
            showcar(arr_goodlist);
            showmcar(arr_goodlist);
            document.cookie = 'carlist='+JSON.stringify(arr_goodlist)+';expires='+now.toUTCString()+';path=/';           
        } 
//-----------------主购物车中商品生成-----------------------
$carList = $('.car-list');
showmcar(arr_goodlist);
function showmcar(arr){
    if($carList){
    $carList.html(
    arr.map(function(item){
        return `<li data-id="${item.id}">
                    <a href="/html/detail.html?${item.id}">
                        <img class="img-c" src="${item.imgurl}"/>
                    </a>
                    <span class="name-c">${item.title}</span>
                    <div class="goodsqty">
                        <span class="btn-jian">-</span>
                        <input class="qty-c" value="${item.qty}" type="text" />
                        <span class="btn-jia">+</span>
                    </div>
                    <span class="price-c">${item.price}</span>
                    <span class="aprice-c">${(item.price*item.qty).toFixed(2)}</span>
                    <span class="del-c">&times;</span>
                </li>`
    }).join('')
    )
    }
}
//-----------------------主购物车删除商品-----------------------
if($carList){
    $carList.on('click','span',function(){
        if($(this).hasClass('del-c')){
            $tarli = $(this).parent();
            var id = $tarli.attr('data-id');
            arr_goodlist.forEach(function(item,idx){
                if(item.id==id){
                    arr_goodlist.splice(idx,1);
                    return;
                }
            })
        console.log(arr_goodlist)
        showcar(arr_goodlist);
        showmcar(arr_goodlist);
        document.cookie = 'carlist='+JSON.stringify(arr_goodlist)+';expires='+now.toUTCString()+';path=/'; 
        }
        //减号功能
        if($(this).hasClass('btn-jian')){
            $tarli=$(this).parent().parent();
            var id=$tarli.attr('data-id')
            arr_goodlist.forEach(function(item,idx){
                if(item.id==id){
                    item.qty--;
                    if(item.qty==0){
                        arr_goodlist.splice(idx,1);
                        return; 
                    }
                }
            })
        showcar(arr_goodlist);
        showmcar(arr_goodlist);
        document.cookie = 'carlist='+JSON.stringify(arr_goodlist)+';expires='+now.toUTCString()+';path=/'; 
        }
        //加号功能
        if($(this).hasClass('btn-jia')){
            $tarli=$(this).parent().parent();
            var id=$tarli.attr('data-id')
            arr_goodlist.forEach(function(item,idx){
                if(item.id==id){
                    item.qty++;
                }
            })
        showcar(arr_goodlist);
        showmcar(arr_goodlist);
        document.cookie = 'carlist='+JSON.stringify(arr_goodlist)+';expires='+now.toUTCString()+';path=/'; 
        }
    })

}
//------------------------详情页加入购物车------------------------
//判断是否在详情页
var $buycar = $('.buycar')
if($buycar.length>0){
    var num = 0;
    var imgurl = $('.mainImg').attr('src');
    var title = $('.show-r h2').text();
    var price = $('.sppp').text();
    var cate = $('.cate').text();
    $buyqty = $('.buyqty').val(num)
    $buycar.on('click','span',function(){
        //减号
        if($(this).hasClass('buyjian')){
            if($buyqty.val()>0){
                num--;
                $buyqty.val(num)
            }else{
                return;
            }
        }
        if($(this).hasClass('buyjia')){
            num++;
            $buyqty.val(num);
        }
        if($(this).hasClass('add-car')){
            var id=$(this).attr('data-id')
            if(num>0){
            for(var i=0;i<arr_goodlist.length;i++){
                        //如果购物车中存在次商品
                        if(arr_goodlist[i].id==id){
                            arr_goodlist[i].qty+=Number(num);
                            break;
                        }
                    }
            //不存在此商品,请求一次数据库，获得数据                  
            if(i===arr_goodlist.length){
                // $.ajax({
                //         type:"get",
                //         url:"/api/goods.php",
                //         data:"id="+id,
                //         success:function(res){
                //             var arr=JSON.parse(res);
                //             arr_h={
                //             imgurl:arr.imgurl,
                //             title:arr.name,
                //             price:arr.price,
                //             id:id,
                //             cate:arr.cate,
                //             qty:num
                //             }
                //         arr_goodlist.push(arr_h);  
                //         }
                //     })
                arr_h={
                    imgurl:imgurl,
                    title:title,
                    price:price,
                    id:id,
                    cate:cate,
                    qty:num
                    }
                 arr_goodlist.push(arr_h);     
                }
            }                
            showcar(arr_goodlist);
            showmcar(arr_goodlist);
            document.cookie = 'carlist='+JSON.stringify(arr_goodlist)+';expires='+now.toUTCString()+';path=/';                          
        }
    })
}
//---------------------导航栏动画---------------------------------
            $spanlist = $('#head .header .nav .list');
            $listul = $('#head .header .nav .list ul');
            //判断是否是首页
            //首页不使用动画
            if($('.banner').length>0){

                $spanlist.on('mouseenter',function(){
                    
                })
                $spanlist.on('mouseleave',function(){
                    
                })
            }else{
            //其它页面使用动画
                $listul.hide();
            //设置定时器延时收起
            var timer;
            $spanlist.on('mouseenter',function(){
                clearInterval(timer);
                $listul.slideDown();           
             })
            $spanlist.on('mouseleave',function(){
                clearInterval(timer);
                timer=setTimeout(function(){
                    $listul.slideUp();  
                },600)                          
             })
            }      
//---------------------导航栏吸顶----------------------
            $nav = $('#head .header .nav');
            $(window).on('scroll',function(){
            var scrollTop = $(window).scrollTop();
            if(scrollTop>500){
                //当滚动条到达500时，掩藏首页的下拉导航栏
                if($('.banner').length>0){
                    $listul.hide();
                }
                $nav.css({position:'fixed',top:0,left:0})
            }else{
                //当滚动条小于500时，显示首页的下拉导航栏
                if($('.banner').length>0){
                    $listul.show();
                }
                $nav.css({position:'relative'});
            }
        })
//----------------------------点击购物车图标跳转到购物车--------------------
        var shopcar = document.querySelector('.search .shopcar .carmain')
        shopcar.onclick = function(){
            console.log(66)
            window.location.href = '/html/shopcar.html';
        }
//-----------------根据登录信息显示-------------------------
        var ulinfor = document.querySelector('.header .sign ul');
        showhead();
        function showhead(){
            var username = cookieget('username');
            ulinfor.innerHTML='';
            if(username){
                var li1 = document.createElement('li');
                li1.innerHTML = `<span class="user-na">${username}</span>,欢迎光临No5时尚广场。`;
                ulinfor.appendChild(li1);
                var li2 = document.createElement('li');
                li2.innerText = '退出';
                li2.className = 'btnout'
                ulinfor.appendChild(li2);
            }else{
                ulinfor.innerHTML = `<li>下午好,欢迎光临No5时尚广场。</li>
                                    <li><a href="/html/register.html">[登录]</a></li>
                                    <li><a href="/html/register.html">[免费注册]</a></li>`
            }
        }
        console.log($('.btnout'))
//------------退出登录按钮-------------
        ulinfor.onclick = function(e){
            e=e||window.event;
            var target = e.target||e.srcElement;
            if(target.className=='btnout'){
                var now = new Date()
                now.setDate(now.getDate()-100);
                // 删除cookie
                document.cookie = 'username=xx;expires=' + now.toString()+';path=/';
                document.cookie = 'password=xx;expires=' + now.toString()+';path=/';
                window.location.reload();
            }
        } 
    })
})
