function Ajax(options){

    var defaults = {
        // 请求类型
        type:'get',

        // 是否异步请求
        async:true,

        jsonpCallbackName:'callback'
    }

    // 扩展默认参数
    for(var attr in options){
        defaults[attr] = options[attr];
    }

    // 复制一份扩展后的defaults
    var opt = {};
    for(var attr in defaults){
        opt[attr] = defaults[attr];
    }

    // {id:1,qty:20} => id=1&qty=20
    var params = '';
    if(opt.data){
        for(var attr in opt.data){
            params += attr + '=' + opt.data[attr] + '&'
        }

        // 去除多余的&
        params = params.slice(0,-1);
    }

    if(opt.type.toLowerCase() === 'get' || opt.type.toLowerCase() === 'jsonp'){
        opt.url += '?'  + params;
        params = null;
    }

    // jsonp请求
    // api/goods.php?id=1&qty=20
    if(opt.type.toLowerCase() === 'jsonp'){
        var callbackName = 'getData' + parseInt(Math.random()*100000);

        // 预设全局函数
        window[callbackName] = function(res){
            try{
                res = JSON.parse(res);
            }catch(err){}

            typeof opt.success === 'function' && opt.success(res);

            // 请求成功后，移除生成script标签
            document.body.removeChild(script);
        }

        // 判断url中是否有?
        // 如果有，则&callback
        // 如果没有，则?callbak
        opt.url += (opt.url.indexOf('?')>=0 ? '&' : '?') + opt.jsonpCallbackName + '='+callbackName
        
        var script = document.createElement('script');
        script.src = opt.url;

        document.body.appendChild(script);

        return;
    }


    // 兼容浏览器写法
    var xhr = null;
    try{
        xhr = new XMLHttpRequest();
    }catch(err){
        // ie低版本浏览有多种异步请求的实现
        try{
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(err){
            try{
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }catch(err){
                alert('你的浏览器太low了，这个世界不适合你');
            }
        }
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)){
            var res = xhr.responseText;
            try{
                res = JSON.parse(res);
            }catch(err){}

            // if(typeof opt.success === 'function'){
            //  opt.success(res)
            // }

            typeof opt.success === 'function' && opt.success(res);
        }
    }

    

    xhr.open(opt.type,opt.url,opt.async);

    // post请求必须设置请求头
    if(opt.type.toLowerCase() === 'post'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    }

    xhr.send(params);
}

var ajax = function(options){
    return new Ajax(options);
}

ajax.get = function(options){
    options.type = 'get';
    return new Ajax(options);
}
ajax.post = function(options){
    options.type = 'post';
    return new Ajax(options);
}
ajax.jsonp = function(options){
    options.type = 'jsonp';
    return new Ajax(options);
}
