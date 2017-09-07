function Banner(options){
    var defaults  = {
        //切换按钮
        btnchange:true,
        //左右按钮
        btnlr:true,
        //图片地址数组
        img:[],
        //初始显示图片索引
        index:0,
        // fade:淡入淡出, vertial:垂直滚动, horizontal:水平滚动, show:幻灯片
        showform:'horizontal',
        //轮播图放置区域
        ele:'.banner',
        //时间间隔
        gap:1000
    }
    var opt = Object.assign({},defaults,options);
    this.ele = document.querySelector(opt.ele);
    //获取图片尺寸
    this.width = this.ele.offsetWidth;
    this.height = this.ele.offsetHeight;
    //是否有数字按钮
    this.btnchange = opt.btnchange;
    //是否有左右按钮
    this.btnlr = opt.btnlr;
    //获取图片
    this.img = opt.img;
    //获取默认显示图片索引
    this.index = opt.index;
    //获取时间间隔
    this.gap = opt.gap;
    //轮播图切换样式
    this.showform = opt.showform;
    //获取长度
    this.len = this.img.length;

}
Banner.prototype = {
    //初始化
    init(){
        //给显示区域设置样式
        this.ele.style.overflow = 'hidden';
        this.ele.style.position = 'relative';
        var ul = document.createElement('ul');
        ul.style.position = 'absolute';
        // ul.style.overflow = 'hidden';
        //轮播图区域尺寸定义
        if(this.showform=='horizontal'){
            ul.style.width = this.width*(this.len+1)+'px';
            ul.style.height = this.height+'px';
            ul.style.top = 0;
        }else if(this.showform=='vertial'){
            ul.style.width = this.width+'px';
            ul.style.height = this.height*this.len+'px';
            ul.style.left =0;
        }else if(this.showform=='fade'){
            ul.style.width = this.width;
            ul.style.height = this.height;
        }else if(this.showform=='show'){
            ul.style.width = this.width;
            ul.style.height = this.height;
        }
        this.ele.appendChild(ul);
        //根据图片数组生成图片
        for(var i=0;i<this.len;i++){
            var li = document.createElement('li');
            li.style.listStyle = 'none';
            if(this.showform=='horizontal'){
               li.style.float = 'left'; 
            }
            else if(this.showform=='vertial'){
               
            }else if(this.showform=='fade'){
                li.style.position = 'absolute';
                li.style.top = 0;
                li.style.left = 0;
            }           
            var img = document.createElement('img');
            img.src = this.img[i];
            img.style.display = 'block';
            img.style.width = this.width;
            img.style.height = this.height;
            li.appendChild(img);
            ul.appendChild(li);           
        }
        if(this.showform=='horizontal'){
                ul.appendChild(ul.children[0].cloneNode(true));
                this.len++;
            }
        //判断是否需要左右按钮
        if(this.btnlr){
            //创建左按钮，并设置样式
            var spanl = document.createElement('span');
            spanl.innerHTML = '&lt;';
            spanl.style.position = 'absolute';
            spanl.style.top = '45%';
            spanl.style.left = '20px';
            spanl.style.width = '30px';
            spanl.style.height = '30px';
            spanl.style.textAlign = 'center';
            spanl.style.lineHeight = '30px';
            spanl.style.backgroundColor = '#efefef';
            spanl.style.opacity = '0.6';
            this.ele.appendChild(spanl);
            //创建右按钮，并设置样式
            var spanr = document.createElement('span');
            spanr.innerHTML = '&gt;';
            spanr.style.position = 'absolute';
            spanr.style.top = '50%';
            spanr.style.right = '20px';
            spanr.style.width = '30px';
            spanr.style.height = '30px';
            spanr.style.textAlign = 'center';
            spanr.style.lineHeight = '30px';
            spanr.style.backgroundColor = '#efefef';
            spanr.style.opacity = '0.6';
            this.ele.appendChild(spanr);
            //给左按钮绑定事件
            spanl.onclick = ()=>{
                this.index--;
                this.showPic();
            }
            //给右按钮绑定事件
            spanr.onclick = ()=>{
                this.index++;
                this.showPic();
            }
        }
        //判断是否有下方单页按钮
        if(this.btnchange){
            //创建生成单页按钮区域
            var page = document.createElement('div');
            page.style.position = 'absolute';
            page.style.left = '60%';
            page.style.bottom = '20px';
            //根据图片数量创建生成按钮，并设置样式
            for(var i=0;i<this.len-1;i++){
                var spanb = document.createElement('span');
                page.appendChild(spanb);
                spanb.style.display = 'inline-block';
                spanb.style.width = '20px';
                spanb.style.height = '20px';
                spanb.style.textAlign = 'center';
                spanb.style.margin = '0 5px';
                spanb.style.backgroundColor = '#fff';
                spanb.style.color = '#000';
                spanb.style.borderRadius = '50%';
                // spanb:hover.style.cursor = 'pointer';
                spanb.innerHTML = i+1;
                if(i==this.index){
                    spanb.style.backgroundColor = '#58bc58';
                    spanb.style.color = '#fff';
                }
            }
            this.ele.appendChild(page);
            page.onclick = (e)=>{
                var target = e.target;
                if(target.tagName.toLowerCase()=='span'){
                    this.index = target.innerText -1;

                    this.showPic();
                }
            }
        }
        this.autoPlay();

        this.ele.onmouseenter = ()=>{
            this.stop();
        }
        this.ele.onmouseleave = ()=>{
            this.autoPlay();
        }

        this.ul = ul;
        this.page = page;
    },
    stop(){
        clearInterval(this.timer);
    },
    autoPlay(){
        this.timer = setInterval(()=>{
            this.index++;
            this.showPic();
        },this.gap);
    },
    showPic(){
        if(this.index>=this.len){
            this.index = 1;
            this.ul.style.left = 0;
        }else if(this.index<0){
            this.index = this.len-2;
            this.ul.style.left = -this.width*(this.len-1)+'px';
        }
        var targetleft = -this.index*this.width;

        animate(this.ul,{left:targetleft})
        if(this.btnchange){
            for(var i=0;i<this.len-1;i++){
                this.page.children[i].style.backgroundColor =' #fff';
                this.page.children[i].style.color = '#000'; 
            }
            if(this.index==this.len-1){
                this.page.children[0].style.backgroundColor = '#58bc58';  
                this.page.children[0].style.color = '#fff'; 
            }else{

                this.page.children[this.index].style.backgroundColor = '#58bc58';  
                this.page.children[this.index].style.color = '#fff';
            }
        }
    }

}
Object.defineProperty(Banner.prototype,'constructor',{
    value:Banner
});
