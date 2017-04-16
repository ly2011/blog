# Gulp中的增量编译

[Gulp.js](http://gulpjs.com/)是目前前端非常流行的自动化构建工具，它基于流，代码优于配置，API简单，又有着大量优秀的第三方插件。它的`gulp.watch()`接口，可以让我们监听文件改动而进行自动构建，但是如果存在耗时的任务或者随着项目的逐渐增大，可能每次构建都要花费很多的时间，那么在Gulp中有什么解决的办法呢？

其实在Gulp的文档中对于增量编译有推荐下面[4个插件](https://github.com/gulpjs/gulp#incremental-builds)：

- [gulp-changed](https://github.com/sindresorhus/gulp-changed) - only pass through changed files
- [gulp-cached](https://github.com/contra/gulp-cached) - in-memory file cache, not for operation on sets of files
- [gulp-remember](https://github.com/ahaurw01/gulp-remember) - pairs nicely with gulp-cached
- [gulp-newer](https://github.com/tschaub/gulp-newer) - pass through newer source files only, supports many:1 source:dest

那么他们的具体用法和区别是什么呢？

## [gulp-cached](https://github.com/contra/gulp-cached)

gulp-cached可以将第一次传递给它的文件内容保留在内存中，如果之后再次执行task，它会将传递给它的文件和内存中的文件进行比对，如果内容相同，就不再将该文件继续向后传递，从而做到了只对修改过的文件进行增量编译。

```
var gulp = require('gulp');
var less = require('gulp-less');
var cached = require('gulp-cached');

gulp.task('less', function() {
    gulp.src('./src/*.less')
        .pipe(cached('less'))
        .pipe(less())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.less', ['less']);
});

```

gulp-cached插件还可以接收一个可选的optimizeMemory参数，插件默认会将文件内容保存在内存中，如果将optimizeMemory设置为true，那么会转而将文件的md5值保留在内存中，从而减少对内存的占用，但是另一方面计算md5值也会消耗更多的时间，插件的作者建议在一般情况下，并不需要开启这个功能。

但是，gulp-cached在使用时也有一些限制，比如下面的例子：

```
var gulp = require('gulp');
var cached = require('gulp-cached');
var remember = require('gulp-remember');
var less = require('gulp-less');
var concat = require('gulp-concat');

gulp.task('concat', function() {
    gulp.src('./src/*.less')
        .pipe(cached('concat'))
        .pipe(less())
        .pipe(remember('concat'))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.less', ['concat']);
});

```

这是一个监听less文件改动并自动编译成css文件后合并的task，考虑一下这种情况，在修改文件a.less后，触发了concat的task，但是由于此时并没有修改文件b.less，所以传递给gulp-concat插件的b.less被gulp-cached过滤掉了，导致最后生成的all.css文件中只有修改后的a.less编译成的内容。那如何解决这个问题呢，此时就需要借助gulp-remember了。

## [gulp-remember](https://github.com/ahaurw01/gulp-remember)

gulp-remember同样可以在内存中缓存所有曾经传递给它的文件，但是它和gulp-cached的区别是，在之后的task中，gulp-cached会过滤掉未经修改的文件不再向下传递，而gulp-remember则会将未传递给它的文件进行补足从而能够继续向下传递，因此通过gulp-cached和gulp-remember的结合使用，既能做到只对修改过的文件进行编译，又能做到当相关联的文件任意一个发生改变时，编译所有相关的文件。

```
var gulp = require('gulp');
var cached = require('gulp-cached');
var remember = require('gulp-remember');
var less = require('gulp-less');
var concat = require('gulp-concat');

gulp.task('concat', function() {
    gulp.src('./src/*.less')
        .pipe(cached('concat'))
        .pipe(less())
        .pipe(remember('concat'))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.less', ['concat']);
});

```

由于在第一次合并文件时，gulp-remember已经将传递过来的文件缓存在内存中了，那么即使在后续的task执行中，gulp-cached插件过滤掉了未经修改过的less文件，但是gulp-remember还是能够通过自己的缓存来补全这些缺失的文件，从而做到正确地合并文件。你可能要问了对于这种情况，为什么还要额外引入两个插件，直接监听文件改动重新编译不就好了么？

```
gulp.task('concat', function() {
    gulp.src('./src/*.less')
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist'));
});

```

相比上面这种不使用插件方式，gulp-cached和gulp-remember的结合使用还是有一定优势的：
gulp-remember缓存的是less文件编译后生成的css文件，这样只有修改了的less文件才需要重新编译成css文件，其他less文件对应的css文件可以直接从gulp-remember的缓存中读取，而不使用插件的方式每次都要重现编译所有的less文件。

另外，不要忘了我们还可以合理的管理两个插件的缓存：

```
gulp.task('watch', function() {
    var watcher = gulp.watch('./src/*.less', ['concat']);
    watcher.on('change', function(event) {
        console.log(event.type);
        if (event.type === 'deleted') {
            delete cached.caches['concat'][event.path];
            remember.forget('concat', require('gulp-util').replaceExtension(event.path, '.css'));
        }
    });
});

```

## [gulp-changed](https://github.com/sindresorhus/gulp-changed)

gulp-changed插件也能够像gulp-cached插件一样过滤未修改过的文件做到增量编译，不同之处主要在于如何判断文件被修改过，gulp-cached是通过对文件设置缓存来进行比较，而gulp-changed则是通过比较源文件和生成文件。

```
var gulp = require('gulp');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('img', function() {
    gulp.src('./src/img/*')
        .pipe(changed('./dist/img'))
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('watch', function() {
    gulp.watch('src/img/*.png', ['img']);
});

```

由于gulp-changed是比较源文件和生成文件，所以调用插件的时候，要传入生成的位置，一般就是最后`gulp.dest()`方法要传入的参数。插件默认比较的是文件修改的时间，如果不同，就说明源文件有被修改过。另外可以通过hasChanged参数来使用插件内置的另一种
比较方式：`changed('dist', {hasChanged: changed.compareSha1Digest})`，也就是通过计算文件内容的sha1值来比较，一般情况下，生成文件的内容都是不同于源文件的，除非只是简单的拷贝，所以说基本上没什么用，hasChanged参数也支持传入一个函数来进行自定义比较。

在使用gulp-changed插件时有一个需要注意的地方，如果在task中改变了文件的后缀名，那么就需要通过extension参数来指定新的后缀名，否则插件无法找到生成的文件，比较令人遗憾的是，对于这种情况gulp-changed插件不会有任何提示，只是默默的执行了task，但是完全没有起到增量编译的目的。

```
var gulp = require('gulp');
var changed = require('gulp-changed');
var less = require('gulp-less');

gulp.task('less', function() {
    gulp.src('./src/*.less')
        .pipe(changed('./dist', {
            extension: '.css'
        }))
        .pipe(less())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.less', ['less']);
});

```

## [gulp-newer](https://github.com/tschaub/gulp-newer)

gulp-newer既可以像gulp-cached/gulp-changed那样1对1地进行增量编译，也可以像gulp-cached配合gulp-remember那样多对1地进行增量编译。它实现增量编译的原理和gulp-changed相同，都是通过比较源文件和生成文件，只不过它只支持比较修改时间。

先来看一个1对1进行增量编译的例子：

```
var gulp = require('gulp');
var newer = require('gulp-newer');
var less = require('gulp-less');

gulp.task('less', function() {
    gulp.src('./src/*.less')
        .pipe(newer({
            dest: './dist',
            ext: '.css'
        }))
        .pipe(less())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.less', ['less']);
});

```

多对1增量编译的例子如下：

```
var gulp = require('gulp');
var newer = require('gulp-newer');
var less = require('gulp-less');

gulp.task('less', function() {
    gulp.src('./src/*.less')
        .pipe(newer('./dist/all.css'))
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.less', ['less']);
});

```

我目前的看法是借助gulp-newer进行多对1的增量编译和直接监听文件自动编译的区别并不是很大（它和gulp-cached配合gulp-remember使用还是有区别的，没有办法带来之前说的缓存编译结果的好处），可能唯一的好处就是下面说的这种情况：通过`gulp.watch()`监听了所有的文件，但是触发task的源文件只有a文件和b文件，那么此时修改不相关的c文件，gulp-newer可以防止重复编译a文件和b文件情况的出现。关于gulp-newer和gulp-changed，你也可以参考下[Stackoverflow](http://stackoverflow.com/questions/24730215/gulp-newer-vs-gulp-changed)上对他们的比较。

## [gulp-watch](https://github.com/floatdrop/gulp-watch)

除了上面介绍的和`gulp.watch()`配合使用的4个插件外，我们还可以直接借助gulp-watch插件来完成增量编译。

```
var gulp = require('gulp');
var watch = require('watch');
var less = require('less');

gulp.task('watch-less', function() {
    gulp.src('./src/*.less')
        .pipe(watch('./src/*.less'))
        .pipe(less())
        .pipe(gulp.dest('./dist'));
});

```

gulp-watch可以做到和gulp原生API`gulp.watch()`一样监听文件改动，并且由于它是整个task的一环，因此每次文件改动时，只有这个被改动的文件会被gulp-watch继续向下传递，而且这种写法也更接近于我们使用gulp插件的方式。另外还有的一个好处是执行`watch-less`task，会自动运行一次编译less的task，而`gulp.watch()`在启动时，则什么都不会做。不过gulp-watch也有它的限制，无法处理concat这样的task，具体原因可以参考[这里](https://github.com/floatdrop/gulp-watch/issues/6)。
