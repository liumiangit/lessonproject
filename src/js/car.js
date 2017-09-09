/* 
* @Author: Marte
* @Date:   2017-09-02 14:25:24
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-08 15:00:08
*/
require(['config'],function(){
    require(['jquery'],function($){
        $shopcar = $('.search .shopcar');
        var cookie = cookieget('carlist');
        var now = new Date();
        now.setDate(now.getDate());
        var arr_goodlist;
        //判断cookie中为空的情况
        if(cookie == ''){
            arr_goodlist=[]
        }else{
            arr_goodlist=JSON.parse(cookie)
        }
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
        //显示商品数量
        str1.innerText=totalqty;
        //显示商品总价
        str2.innerText=totalprice;
        goodtotal.innerText=totalqty;
        }
// ----------------------删除购物车内的商品--------------------------
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
            document.cookie = 'carlist='+JSON.stringify(arr_goodlist)+';expires='+now.toUTCString()+';path=/';
        }
    })
})
