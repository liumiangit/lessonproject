require(['config'],function(){
    require(['jquery','common'],function($,com){
        $('#head').load('base.html .header');
        $('#foot').load('base.html .foot');
        require(['base'],function(){
            //登录数据及相对应的提示
            $logname = $('.loginR .login .logname');
            $alert1 = $('.loginR .login .alert1')
            $logpass = $('.loginR .login .logpass')
            $alert2 = $('.loginR .login .alert2')
            $logcode = $('.loginR .login .logcode')
            $alert3 = $('.loginR .login .alert3')
            $code = $('.loginR .login .code')
            $logbtn = $('.loginR .login .logbtn')
            //注册数据及相对应的提示
            $regname = $('.loginR .register .regname');
            $alert4 = $('.loginR .register .alert4');
            $regnameok = $regname.siblings('img');
            $regpass = $('.loginR .register .regpass');
            $alert5 = $('.loginR .register .alert5');
            $regpassok = $regpass.siblings('img');
            $regpassr = $('.loginR .register .regpassr');
            $alert6 = $('.loginR .register .alert6');
            $regpassrok = $regpassr.siblings('img');
            $regemail = $('.loginR .register .regemail');
            $alert7 = $('.loginR .register .alert7');
            $regemailok = $regemail.siblings('img');
            $regcode = $('.loginR .register .regcode');
            $regcodeok = $regcode.siblings('img');
            $alert8 = $('.loginR .register .alert8');
            $codet = $('.loginR .register .codeText');
            $agree = $('.loginR .register .agree');
            $regbtn = $('.loginR .register .regbtn');
            $showpass = $('.loginR .register .showpass li');
            //注册验证
            //验证用户名是否存在以及合法性
            // var loop = 0;
            // console.log(loop)
            // $regbtn.attr("disabled","disabled");
            // $regbtn.css({backgroundColor:'#666'})
            // if($agree.checked){
            //    $regbtn.attr("disabled",false);
            //    $regbtn.css({backgroundColor:'#359BDD'}) 
            // }
            // if(!$agree.attr('checked')){
            //     $regbtn.attr("disabled","disabled");
            //     $regbtn.css({backgroundColor:'#666'})
            // }else{
            //     $regbtn.attr("disabled",false);
            //     $regbtn.css({backgroundColor:'#359BDD'})
            // }
            $regnameok.hide();
            $regpassok.hide();
            $regpassrok.hide();
            $regemailok.hide();
            $regcodeok.hide();
            $code.text(vCode());
            $codet.text(vCode());
//----------------------注册-------------------------
            $regname.blur(function(){
                var reg = /^[a-z][\da-z\-]{5,19}$/i;
                if(!reg.test($(this).val())){
                    $(this).css({border:'1px solid #f00'});
                    $alert4.text('用户名不合法');
                    $alert4.css({color:'#f00'});
                    $regnameok.hide();
                }else{
                    $.ajax({
                        type:"get",
                        url:"/api/reg.php",
                        data:"username="+$(this).val(),
                        success: res => {
                            if(res=='fail'){
                                $(this).css({border:'1px solid #f00'})
                                $alert4.css({color:'#f00'})
                                $alert4.text('对不起，此用户名太受欢迎了，请换一个')
                                $regnameok.hide(); 
                            }else{
                                $(this).css({border:'1px solid #03AFEC'})
                                $alert4.css({color:'#03AFEC'})
                                $regnameok.show();
                                $alert4.text('')
                            }
                        }
                    })
                }
            })
            //验证密码等级
            $regpass.keyup(function(){
                var hasNumber=false;
                var hasLetter=false;
                var hasSign=false;
                var pass = $regpass.val().trim().toUpperCase();
                for(var i=0;i<pass.length;i++){
                    if(!isNaN(pass[i])){
                        hasNumber = true;
                    }else{
                        if(pass.charCodeAt(i)>=65 && pass.charCodeAt(i)<=90){
                            hasLetter = true;
                    }else{
                        hasSign = true;
                    }
                }
                }
                if(hasSign && (hasLetter || hasNumber)){
                    $showpass.eq(0).css({backgroundColor:'#c00'});
                    $showpass.eq(1).css({backgroundColor:'#f90'});
                    $showpass.eq(2).css({backgroundColor:'#0c0'});
                }else if(hasLetter && hasNumber){
                    $showpass.eq(0).css({backgroundColor:'#f00'});
                    $showpass.eq(1).css({backgroundColor:'#f60'});
                    $showpass.eq(2).css({backgroundColor:'#ccc'});
                }else if(hasSign || hasLetter || hasNumber){
                    $showpass.eq(0).css({backgroundColor:'#f00'});
                    $showpass.eq(1).css({backgroundColor:'#ccc'});
                    $showpass.eq(2).css({backgroundColor:'#ccc'});
                }else{
                    $showpass.eq(0).css({backgroundColor:'#ccc'});
                    $showpass.eq(1).css({backgroundColor:'#ccc'});
                    $showpass.eq(2).css({backgroundColor:'#ccc'});
                }
            })
            //验证密码合法性
            $regpass.blur(function(){
                var reg=/^\S{6,19}$/;
                if(!reg.test($regpass.val())){
                    $alert5.show();
                    $alert5.text('密码太短')
                    $alert5.css({color:'#f00'});
                    $(this).css({border:'1px solid #f00'})
                    $regpassok.hide();
                }else{
                    $regpassok.show();
                    $alert5.hide();
                    $(this).css({border:'1px solid #03AFEC'})
                }
            })
            //验证再次输入密码是否相同
            $regpassr.blur(function(){
                if($(this).val()!==$regpass.val()){
                    $alert6.show();
                    $alert6.text('两次输入密码不一致，请检查')
                    $alert6.css({color:'#f00'})
                    $(this).css({border:'1px solid #f00'})
                    $regpassrok.hide();
                }else{
                    $alert6.hide();
                    $(this).css({border:'1px solid #03AFEC'})
                    $regpassrok.show();
                }
            })
            //验证邮箱的合法性
            $regemail.blur(function(){
                var reg=/^[\w\-\.]+@[\da-z\-]+(\.[a-z]{2,}){1,2}$/i;
                if(!reg.test($regemail.val())){
                    $alert7.show();
                    $alert7.text('邮箱不合法，请重新输入');
                    $alert7.css({color:'#f00'});
                    $(this).css({border:'1px solid #f00'})
                    $regemailok.hide();
                }else{
                    $alert7.hide();
                    $(this).css({border:'1px solid #03AFEC'})
                    $regemailok.show();
                }
            })
            //同意条款不点，无法点击按钮
            // if($agree)
            //随机验证码
            $codet.on('click',function(){
                var res = vCode();
                $(this).text(res);
            })
            //提交注册信息
            $regbtn.on('click',function(){
                //验证码
                if($regcode.val()==$codet.text()){
                    $regcodeok.show();
                    $alert8.hide();
                    $.ajax({
                        type:"get",
                        url:"/api/reg.php",
                        data:"username="+$regname.val()+"&password="+$regpass.val()+"&email="+$regemail.val()+"&commit=commit",
                        success:function(res){
                          if(res=='插入数据成功'){
                            alert('恭喜注册成功')
                          }  
                        }
                    })
                }else{
                    $regcodeok.hide();
                    $alert8.show();
                    $alert8.text('请输入正确的验证码');
                    $alert8.css({color:'#f00'})
                }
            })
//-------------------登录---------------------------
            //点击生成随机验证码
            $code.on('click',function(){
                var res = vCode();
                $(this).text(res);
            })
            $logbtn.on('click',function(){
                var now = new Date();
                now.setDate(now.getDate()+7);
                if($logcode.val()==$code.text()){
                    $alert3.hide();
                    $.ajax({
                        type:"get",
                        url:"/api/login.php",
                        data:"username="+$logname.val()+"&password="+$logpass.val(),
                        success:function(res){
                            if(res=='ok'){
                                if(null){
                                    location.href='/index.html';
                                    document.cookie = 'username='+$logname.val()+';expires='+now.toUTCString()+';path=/';
                                    document.cookie = 'password='+$logpass.val()+';expires='+now.toUTCString()+';path=/';
                                }else{
                                    location.href='/index.html';
                                    document.cookie = 'username='+$logname.val()+';path=/';
                                    document.cookie = 'password='+$logpass.val()+';path=/';
                                }                                
                            }else{
                                $alert3.show();
                                $alert3.text('登录信息有误，请重新输入')
                            }
                        }
                    })
                }else{
                    $alert3.show();
                    $alert3.css({color:"#f00"})
                    $alert3.text('请输入正确的验证码')
                }
            })
//----------------------------s随机验证码函数------------------------------
            function vCode(){
                var arr_char = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');

                var res = '';
                for(var i=0;i<4;i++){
                    // 获取随机索引值
                    var idx = parseInt(Math.random()*arr_char.length);

                    // 根据索引值获取字符，并拼接
                    res += arr_char[idx];
                }

                return res;
            }            
        })
    })
})