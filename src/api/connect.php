<?php
/**
 * @Author: liumian
 * @Date:   2017-09-06 20:12:25
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-06 20:18:55
 */
//配置参数
 $servername = 'localhost';
 $username = 'root';
 $password = '';
 $database = 'goodlist';
//链接数据库
 $conn = new mysqli($servername,$username,$password,$database);

//检测连接
if($conn->connect_errno){
    die('连接失败'.$conn->connect_errno)
}

// 设置编码
    $conn->set_charset('utf8');

?>