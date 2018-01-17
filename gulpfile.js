/**
 * Created by automacair on 12/16/17.
 */
/**
 * Created by automacair on 12/13/17.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();



gulp.task('watch',['sync', 'sass'], function(){
    gulp.watch('css/style.scss', ['sass']);
    gulp.watch('js/codeEditor.js', browserSync.reload);
    gulp.watch('index.html', browserSync.reload);


});



gulp.task('sass', function(){
    return gulp.src('css/style.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('sync', function() {
    browserSync.init({
        server: {
            proxy: "local.dev"
            //baseDir: 'wikiSearch'
        }
    })
});




// gulp setup https://css-tricks.com/gulp-for-beginners/
