/* 
* @Author: liumian
* @Date:   2017-08-31 15:03:25
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-01 11:52:48
*/
require(['config'],function(){
    require(['jquery','common','jqueryui'],function($,com,jqui){
        $('#header').load('html/base.html .header')
        $('#foot').load('html/base.html .foot')
    })
})
