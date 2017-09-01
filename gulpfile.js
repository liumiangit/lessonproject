/* 
* @Author: liumian
* @Date:   2017-08-31 14:16:47
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-01 10:04:53
*/
//请求gulp插件
var gulp = require('gulp');
//请求gulp-sass插件
var sass = require('gulp-sass');

//使用gulp创建编译sass文件任务
gulp.task('compileSass',function(){
    setTimeout(function(){
        //找到sass文件
        return gulp.src('./src/sass/*.scss')
        //利用文件流管道编译sass文件
        .pipe(sass({outputStyle:'compact'}).on('error',sass.logError))

        //将编译的文件输出到css文件夹
        .pipe(gulp.dest('./src/css'))
    },500)
});


//监听sass文件修改，自动执行编译任务
gulp.task('listenerSass',function(){
    //调用gulp的监听函数
    return gulp.watch('./src/**/*.scss',['compileSass'])
});

//请求依赖合并插件
var concat = require('gulp-concat');
//请求依赖压缩插件
var uglify = require('gulp-uglify');
//请求依赖重命名插件
var rename = require('gulp-rename');

//利用gulp创建合并任务
gulp.task('mergeJs',function(){
    //查找js文件
    return gulp.src('./src/js/*.js')
    //放入管道流,调用concat合并到all.js
    .pipe(concat('all.js'))
    //输出到js文件夹中
    .pipe(gulp.dest('./dist/js'))
    //调用uglify压缩js文件
    .pipe(uglify())
    //给压缩版重命名
    .pipe(rename({suffix:'.min'}))
    //输出到dist文件中
    .pipe(gulp.dest('./dist/js'))
})

//利用browser-sync同步浏览器更新
//请求browser-sync插件
var browserSync = require('browser-sync');
//利用gulp创建浏览器同步任务
gulp.task('server',function(){
    //调用浏览器同步函数
    browserSync({
        // //创建服务器位置
        //         server:'./src/',
        
                //代理服务器
                proxy:'http://localhost:8888',
        
                //端口名配置
                port:3000,
        
                //监听以下文件类型，自动刷新页面
                files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
        });
    gulp.watch('./src/**/*.scss',['compileSass']);
})

