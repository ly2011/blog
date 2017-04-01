# gulp自动化压缩合并、加版本号解决方案

---

[TOC]

这个方案主要是为了实现js/css的压缩合并、自动添加版本号和压缩html。

- gulp-csso 压缩优化css
- gulp-uglify 压缩js
- gulp-html-minify 压缩html
- gulp-rev-all 生成版本号

主要通过上面插件实现功能，其他插件配合使用。

**gulpfile.js:**

```javascript

// gulpfile.js
var gulp = require('gulp'),
    htmlmini = require('gulp-html-minify'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    csso = require('gulp-csso'),
    filter = require('gulp-filter'),
    RevAll = require('gulp-rev-all'),
    del = require('del');

gulp.task('default',['del'], function () {
    var jsFilter = filter('**/*.js',{restore:true}),
        cssFilter = filter('**/*.css',{restore:true}),
        htmlFilter = filter(['**/*.html'],{restore:true});
    gulp.src('/*.html')
        .pipe(useref())                         // 解析html中的构建块
        .pipe(jsFilter)                         // 过滤所有js
        .pipe(uglify())                         // 压缩js
        .pipe(jsFilter.restore)
        .pipe(cssFilter)                        // 过滤所有css
        .pipe(csso())                           // 压缩优化css
        .pipe(cssFilter.restore)
        .pipe(RevAll.revision({                 // 生成版本号
            dontRenameFile: ['.html'],          // 不给 html 文件添加版本号
            dontUpdateReference: ['.html']      // 不给文件里链接的html加版本号
        }))
        .pipe(htmlFilter)                       // 过滤所有html
        .pipe(htmlmini())                       // 压缩html
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest('/dist'))
})

gulp.task('del',function () {
    del('/dist');                               // 构建前先删除dist文件里的旧版本
})
```

在html中，我们需要先定义好构建块。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>gulp自动化构建解决方案</title>
    <!-- build:css static/css/index.css -->     // 定义了构建后引用的css路径
    <link rel="stylesheet" href="static/css/common.css"/>
    <link rel="stylesheet" href="static/css/index.css"/>
    <!-- endbuild -->
</head>
<body>
    ......

    <!-- build:js static/js/index.js -->        // 定义了构建后引用的js路径
    <script src="static/js/jquery.js"></script>
    <script src="static/js/common.js"></script>
    <script src="static/js/index.js"></script>
    <!-- endbuild -->
</body>
</html>
```

构建完的index.html，我们忽略压缩的html，完成了压缩合并添加版本号等功能。

```html
// dist/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>gulp自动化构建解决方案</title>
    <link rel="stylesheet" href="static/css/index.96cf44da.css"/>
</head>
<body>
    ......

    <script src="static/js/index.42ce3282.js"></script>
</body>
</html>
```
