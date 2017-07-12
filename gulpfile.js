const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var paths = {
    css: {
        src: ['src/AppBundle/Resources/public/sass/**/*.scss'],
        dest: 'web/public/css/main',
        watch: ['src/AppBundle/Resources/public/sass/**/*.scss']
    }
};

var autoprefixerOptions = {
    browsers: [
        'last 3 versions',
        'not ie <= 8'
    ],
    cascade: false
};
gulp.task(
    'default', [
        'sass'
    ]);

gulp.task(
    'sass', function () {
        return gulp.src(paths.css.src)
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer(autoprefixerOptions))
            .pipe(cssnano())
            .pipe(concat('styles.min.css'))
            .pipe(gulp.dest(paths.css.dest))
            .pipe(browserSync.stream());
    });

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        proxy: "wankul.dev"
    });

    gulp.watch(paths.css.watch.concat(paths.css.src), ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("web/*.css").on('change', browserSync.reload);
});
