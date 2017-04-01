# gulp常用插件收集及用法

---

## 匹配符 (*、**、!、{})

---

```javascript
gulp.src('./js/*.js') // * 匹配js文件夹下所有 .js 格式的文件
gulp.src('./js/**/*.js') // ** 匹配 js 文件夹的 0 个或多个子文件夹
gulp.src(['./js/*.js', '!./js/index.js']) // ! 匹配除了 index.js 之外的所有js文件
gulp.src('./js/**/{app,common}.js') // {} 匹配 {} 里的文件名
```

## 文件操作

---

### del(替代 gulp-clean)

```javascript
const del = require('del')

del('./dist')
```

### gulp-rename

描述: 重命名文件

```javascript
const rename = require('gulp-rename')

gulp.src('./index.html')
.pipe(rename('src/saygoodbye.html')) // 直接修改文件名和路径
.pipe(gulp.dest('./dist'))

gulp.src('./index.html')
.pipe(rename({
  dirname: 'text', // 路径名
  basename: 'saygoodbye', // 主文件名
  prefix: 'pre-', // 前缀
  suffix: '-min', // 后缀
  extname: '.html' // 扩展名
}))
.pipe(gulp.dest('./dist'))
```

### gulp-concat

描述: 合并文件

```javascript
const concat = require('gulp-concat')

gulp.src('./js/*.js')
.pipe(concat('all.js')) // 合并all.js文件
.pipe(gulp.dest('./dist'))

gulp.src(['./js/demo1.js', './js/demo2.js', './js/demo3.js'])
.pipe(concat('all.js')) // 按照 [] 里的顺序合并文件
.pipe(gulp.dest('./dist'))
```

### gulp-filter

描述: 在虚拟文件流中过滤文件

```javascript
const filter = require('gulp-filter')

const f = filter(['**', '!*/index.js'])
gulp.src('js/**/*.js')
.pipe(f) // 过滤掉 index.js 这个文件
.pipe(gulp.dest('dist'))

const f1 = filter(['**', '!*/index.js'], { restore: true })
gulp.src('js/**/*.js')
.pipe(f1) // 过滤掉 index.js 这个文件
.pipe(uglify()) // 对其他文件进行压缩
.pipe(f1.restore) // 返回未过滤执行的所有文件
.pipe(gulp.dest('dist')) // 再对所有文件操作, 包括index.js
```

## 压缩

---

### gulp-uglify

描述: 压缩js文件大小

```javascript
const uglify = require('gulp-uglify')

gulp.src('./index.js')
.pipe(uglify()) // 直接压缩 hello.js
.pipe(gulp.dest('./dist'))

gulp.src('./index.js')
.pipe(uglify({
  mangle: true, // 是否修改变量名, 默认为 true
  compress: true, // 是否完全压缩, 默认为 true
  preserveComments: 'all' // 保留所有注释
}))
.pipe(gulp.dest('./dist'))
```

### gulp-csso

描述: 压缩优化 css

```javascript
const csso = require('gulp-csso')

gulp.src('./css/*.css')
.pipe(csso())
.pipe(gulp.dest('./dist/css'))
```

### gulp-html-minify

描述: 压缩 HTML

```javascript
const htmlminify = require('gulp-html-minify')

gulp.src('./index.html')
.pipe(htmlminify())
.pipe(gulp.dest('./dest'))
```

### gulp-imagemin

描述: 压缩图片

```javascript
const imagemin = require('gulp-imagemin')

gulp.src('./img/*.{jpg,png,gif,ico}')
.pipe(imagemin())
.pipe(gulp.dest('./dist/img'))
```

### gulp-zip

描述: ZIP压缩文件

```javascript
const zip = require('gulp-zip')

gulp.src('./src/*')
.pipe(zip('all.zip')) // 压缩成 all.zip 文件
.pipe(gulp.dest('./dist'))
```

## JS/CSS 自动注入

---

### gulp-autoprefixer

描述: 自动为 css 添加浏览器前缀

```javascript
const autoprefixer = require('gulp-autoprefixer')

gulp.src('./css/*.css')
.pipe(autoprefixer()) // 直接添加前缀
.pipe(gulp.dest('dist'))

gulp.src('./css/*.css')
.pipe(autoprefixer({
  browsers: ['last 2 versions'], // 浏览器版本
  cascade: true, // 美化属性, 默认 true
  add: true, // 是否添加前缀, 默认 true
  remove: true, // 删除过时前缀, 默认 true
  flexbox: true, // 为flexbox属性添加前缀, 默认 true
}))
.pipe(gulp.dest('./dist'))
```

查看更多配置：[options](https://github.com/postcss/autoprefixer#options)

更多浏览器版本：[browsers](https://github.com/ai/browserslist#queries)

### gulp-useref

描述: 解析构建块在HTML文件来代替引用未经优化的脚本和样式表。

```html
// index.html

<!-- build:css /css/all.css --> // 定义了构建后引用的css路径
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/main.css">
<!-- endbuild -->

// gulpfile.js

const useref = require('gulp-useref')

gulp.src('./index.html')
.pipe(useref())
.pipe(gulp.dest('./dist'))

```

替换后的 index.html 会变成这样:

```html
<link rel="stylesheet" href="css/all.css"> // 之前的两个 <link> 替换成一个了
```

### gulp-rev

描述: 给静态资源名添加 hash 值: main.css => main-m3u8m3u8m3u8m3u8.css

```javascript
const rev = require('gulp-rev')

gulp.src('./css/*.css')
.pipe(rev())
.pipe(gulp.dest('./dist/css'))
```

### gulp-rev-replace

描述: 重写被 gulp-rev 重命名的文件名

```javascript
const rev = require('gulp-rev')

const revReplace = require('gulp-rev-replace')
const useref = require('gulp-useref')

gulp.src('./index.html')
.pipe(useref()) // 替换HTML中引用的css和js
.pipe(rev()) // 给css、js、html添加hash版本号
.pipe(revReplace()) // 把引用的css和js替换成有版本号的名字
.pipe(gulp.dest('./dist'))
```

### gulp-html-replace

描述：替换html中的构建块。

```html
// index.html

<!-- build:css -->                          // css是buildName,可以自己定义
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/main.css">
<!-- endbuild -->

// gulpfile.js

var htmlreplace = require('gulp-html-replace');

gulp.src('index.html')
    .pipe(htmlreplace({
        'css':'all.css'                     // css是index.html中定义的buildName
    }))
    .pipe(gulp.dest('./dist'))
```

替换之后的index.html中就会变成：

```html
<link rel="stylesheet" href="all.css">      // 之前的两个<link>替换成一个了
```

## 流控制

---

### gulp-if

描述：有条件地运行一个任务。

```javascript
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var condition = true;

gulp.src('./js/*.js')
    .pipe(gulpif(condition, uglify(), concat('all.js')))  // condition为true时执行uglify(), else 执行concat('all.js')
    .pipe(gulp.dest('./dist/'));
```

## 工具

---

### gulp-load-plugins

描述：从包的依赖和附件里加载gulp插件到一个对象里给你选择。

```javascript
// package.json

"devDependencies": {
    "gulp": "^3.9.1",
    "gulp-concat": "^2.6.1",
    "gulp-rename": "^1.2.2",
    "gulp-uglify": "^2.0.1"
}

// gulpfile.js

var $ = require('gulp-load-plugins')();     // $ 是一个对象,加载了依赖里的插件

gulp.src('./**/*.js')
    .pipe($.concat('all.js'))               // 使用插件就可以用$.PluginsName()
    .pipe($.uglify())
    .pipe($.rename('all.min.js'))
    .pipe(gulp.dest('./dist'))
```

### gulp-sass

描述：编译sass。

```javascript
var sass = require('gulp-sass');

gulp.src('./sass/**/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'           // 配置输出方式,默认为nested
    }))
    .pipe(gulp.dest('./dist/css'));

gulp.watch('./sass/**/*.scss', ['sass']);   // 实时监听sass文件变动,执行sass任务
```

### gulp-babel

描述：将ES6代码编译成ES5。

```javascript
var babel = require('gulp-babel');

gulp.src('./js/index.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'))

```
