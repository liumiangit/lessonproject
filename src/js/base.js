/* 
* @Author: Marte
* @Date:   2017-09-02 14:25:24
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-06 16:06:45
*/
// require(['config'],function(){
//         var carlist = document.querySelector('.search .shopcar ul');
//         var res = cookieget('carlist');
//         var arr=[];
//         if(res.length>0){
//           var arr=JSON.parse(res);
//         }
//        carlist.innerHTML = arr.map(function(item){
//         return `<li data-id="${item.id}">
//                     <a href=""><img src="${item.imgurl}"/></a>
//                     <p class="listname">${item.title}</p>
//                     <div class="carprice"><p><span class="pric">${item.price}</span><span class="qty">${item.qty}</span></p><button class="del">删除</button></div>
//                 </li>`
//         }).join('')   
//         // function cookieget(name){
//         //     // 先获取所有cookie
//         //     var cookie = document.cookie;
//         //     if(cookie.length === 0){
//         //         return '';
//         //     }

//         //     // 拆分成数组
//         //     cookie = cookie.split('; ');

//         //     // 遍历cookie，找到想要的cookie值
//         //     var res = '';
//         //     cookie.forEach(function(item){
//         //         var arr = item.split('=');

//         //         if(arr[0] === name){
//         //             res = arr[1];
//         //         }
//         //     });
//         //     return  res;
//         // }
//         //删除购物车内商品
//         carlist.onclick = function(e){
//             e=e||window.event;
//             var target=e.target||e.srcElement;
//             if(target.className=='del'){
//                 var tarli = target.parentNode.parentNode;
//                 // tarli.parentNode.removeChild(tarli);
//                 var id = tarli.getAttribute('data-id');
//                 arr.forEach(function(item,idx){
//                     if(item.id==id){
//                         arr.splice(idx,1);
//                     }
//                 })
//             }
//             document.cookie = 'carlist='+JSON.stringify(arr)+';expires='+now.toUTCString();
//             show(arr);
//         }
// })