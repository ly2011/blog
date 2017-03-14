# gulp常用插件收集及用法

---

[TOC]

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
