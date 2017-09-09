<?php
    // //引入其他php文件
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
    
    // 获取前端传过来的数据
    $pageNo = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 24;
    $cate = isset($_GET['cate']) ? $_GET['cate'] : '';
    $sqty = isset($_GET['sqty'])?$_GET['sqty'] : '';
    $price = isset($_GET['price'])?$GET['price'] : '';
    // 编写sql语句
    $sql = "select * from goods";

    // 利用php条件语句拼接sql
    if($cate){
        $sql .= " where category='$cate'";
    }
    if($sqty){
        $sql .= " order by $sqty desc";
    }
    if($price){
        $sql .=" order by $price";
    }
    $startIdx = $qty*($pageNo-1);

    $sql .= " limit $startIdx,$qty";


    // 获取查询结果
    $result = $conn->query($sql);

    // var_dump($result);

    // 使用查询结果集
    $row = $result->fetch_all(MYSQLI_ASSOC);

    
    
    //释放查询结果集
    $result->close();

    // 格式化数据
    // 关联数组
    $res = array(
        'pageNo'=>$pageNo,
        'qty'=>$qty,
        'total'=>$conn->query('select count(*) from goods')->fetch_row()[0],
        'data'=>$row,
        'status'=>200,
        'msg'=>'success'
    );

    //把结果输出到前台（得到json字符串）
    echo json_encode($res,JSON_UNESCAPED_UNICODE);


    // 释放查询内存(销毁)
    //$result->free();

    //关闭连接
    $conn->close();
?>