const gulp = require('gulp')
const markdown = require('gulp-markdown')

gulp.task('default', () => {
  const options = {
    lang: 'zh',
    format: 'html'
  }
  return gulp.src(['!dist', './**/*.md'])
  .pipe(markdown())
  .pipe(gulp.dest('dist'))
})
