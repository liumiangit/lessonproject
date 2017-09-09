require(['config'],function(){
require(['jquery'],function(){
    $('#head').load('base.html .header');
    $('#foot').load('base.html .foot');
    //获取url中的参数
    var showdetail = document.querySelector('.content .showdetail');
    var id = location.search.slice(1);
    $.ajax({
        type:"get",
        url:"/api/goods.php",
        data:"id="+id,
        success:function(res){
            console.log(res)
            var arr = JSON.parse(res)
            var imgarr=arr.imgarr.split(',');
            showdetail.innerHTML=`<p class="pf">
                        首页 > <span>面部护理</span>  >  <span class="cate">${arr.category}</span> ><span>${arr.name}</span>
                        </p>
                        <div class="show">
                            <ul>
                                <li><img src="${imgarr[0]}"/></li>
                                <li><img src="${imgarr[1]}"/></li>
                                <li><img src="${imgarr[2]}"/></li>
                                <li><img src="${imgarr[3]}"/></li>
                                <li><img src="${imgarr[4]}"/></li>
                            </ul>
                            <div class="show-m">
                                <div class="mainbox">    
                                    <img class="mainImg" src="${arr.imgurl}"/>
                                    <div class="cover"></div>
                                </div>
                                <div class="zoom">
                                    <img class="zoomImg" src=""/>
                                </div>
                                <p>分享到 :</p>
                            </div>
                            <div class="show-r">
                                <h2>${arr.name}</h2>
                                <div class="show1">
                                    <p>英文名称：<span>Lancome Hydra Zen Nuit Soothing Recharging Night Cream</span></p>
                                    <p>商品编号：<span>${arr.id}</span></p>
                                    <p>No5   价：<span class="sppp">${arr.price}</span>市场价:<span class="spp">${arr.price}</span>折扣:<span>${arr.sale}</span>折 </p>
                                    <p>特  价:<span>135.00</span><span>(不返积分)</span></p>
                                </div>
                                <div class="show2">
                                    <p>所属品牌：<span>Lancome 兰蔻</span> → <span>水份缘舒缓系列</span></p>
                                    <p>所属分类：<span>面部护理</span> → <span>润肤步骤</span> → <span>夜间</span></p>
                                    <p>用户评分:<img src="" alt=""><a href="">已有31条评论</a></p>
                                    <p>运费说明：购物满80元免费<a href="">快递查看运费详情</a></p>
                                    <p>消费保障：<span><i></i>品质承诺</span><span><i></i>货到付款</span>  <span><i></i>不满意退货</span> <span><i></i>可靠包装</span></p>
                                </div>
                                <div class="buycar">
                                <span>我要买:</span><span class="buyjian">-</span><input class="buyqty" type="text" /><span class="buyjia">+</span><span class="add-car" data-id=${arr.id}>加入购物车</span>
                                </div>
                            </div>                           
                        </div>`
        }
    })
require(['base'],function(){
    $imgall = $('.content .showdetail .show ul img');
    $imgbig = $('.content .showdetail .show .show-m .mainImg')
    console.log($imgall)
    $imgall.on('mouseover',function(){
        var idx=$(this).index();
        $imgbig.attr('src',$(this).attr('src'));
    })
//-------------------放大镜-------------------------
    $('.zoom').hide();
    $('.cover').hide();
    $('.mainbox').mousemove(function(event){
        $('.zoom').show();
        $('.cover').show();
        //设置大图路径
        $('.zoomImg').attr('src',$('.mainImg').attr('src'));
        var left=event.pageX-$('.mainbox').offset().left-50;
        var top=event.pageY-$('.mainbox').offset().top-50;
                              
        if(left<0){
            left = 0;
        }else if(left > $('.mainbox').width()-100){
            left = $('.mainbox').width()-100;
        }

        if(top<0){
            top = 0;
        }else if(top > $('.mainbox').height()-100){
            top = $('.mainbox').height()-100;
        }
        $('.cover').css({left:left,top:top}); 
        $('.zoomImg').css({left:-left*2,top:-top*2});
        })

        $('.mainbox').mouseleave(function(){
            $('.zoom').hide();
            $('.cover').hide();
        })
//--------------------下方商品评论区tab切换-----------
$tabul = $('.tab-head ul')
$tabli = $tabul.find('li')
$tabli.eq(0).addClass('active');
$tabcont = $('.tab-content .tabt')
$tabcont.hide().eq(0).show()
$tabul.on('click','li',function(){
    var idx = $(this).index()
    for(var i=0;i<$tabli.length;i++){
        if(i==idx){
            $tabli.eq(i).addClass('active');
            $tabcont.eq(i).show();
        }else{
            $tabli.eq(i).removeClass('active');
            $tabcont.eq(i).hide(); 
        }
    }
})
})
})
})