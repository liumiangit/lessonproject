<?php
    // include 'connect.php';
    //配置参数
     $servername = 'localhost';
     $username = 'root';
     $password = '';
     $database = 'project';
    //链接数据库
     $conn = new mysqli($servername,$username,$password,$database);

    //检测连接
    if($conn->connect_errno){
        die('连接失败'.$conn->connect_errno);
    }

// 设置编码
    $conn->set_charset('utf8');
    
    $username = isset($_GET['username']) ? $_GET['username'] : '';
    $password = isset($_GET['password']) ? $_GET['password'] : '';

    // 密码md5加密
    $password = md5($password);

    $sql = "select * from user where username='$username' and password='$password'";

    // echo "$sql";

    // 获取查询结果
    $result = $conn->query($sql);

    $row = $result->fetch_row();

    //print_r($row[0]);

    if($row[0]){
        echo 'ok';
    }else{
        echo 'fail';
    }
    

    // 释放查询内存(销毁)
    $result->free();

    //关闭连接
    $conn->close();
?>