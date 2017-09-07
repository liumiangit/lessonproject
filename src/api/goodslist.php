<?php

    //获取html页面的参数
    $pageNo = isset($_GET['pageNo'])? $_GET['pageNo']:1;
    $qty = isset($_GET['qty'])?$_GET['qty']:24;
    //获取json文件地址
    $file_url = './data.json';
    //打开文件
    $myfile = fopen($file_url,'r');
    //读取文件内容
    //*filesize获取文件全部长度
    $content = fread($myfile,filesize($file_url));

    $arr_data = json_decode($content);

    // print_r($arr_data);
    $arr = array(
            'data'=>array_slice($arr_data,($pageNo-1)*$qty,$qty),
            'total'=>count($arr_data)
        );
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);

    //关闭文件
    fclose($myfile);
?>