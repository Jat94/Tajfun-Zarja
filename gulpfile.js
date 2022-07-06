const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');
const fileinclude = require('gulp-file-include');


function browsersync() {
    browserSync.init({
        server: {baseDir: 'app/'},
        notify: false
    });
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'app/js/custom.js'
    ])
    .pipe(concat('custom.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(browserSync.stream());
}


function styles() {
    return src('app/css/style.scss')
    .pipe(sass())
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] ,grid: 'true' }))
    .pipe(cleancss({
        level: {
          1: {
            specialComments: 0
          }
        }
      }))
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream());
}


function images() {
    return src('app/img/src/**/*')
    .pipe(newer('app/img/dest/'))
    .pipe(imagemin())
    .pipe(dest('app/img/dest/'));
}

function cleanimg() {
    return del('app/img/dest/**/*', {force: true});
}

function cleanbuild() {
    return del('build/**/*', {force: true});
}

function buildcopy() {
    return src([
        'app/css/**/*.min.css',
        'app/js/**/*.min.js',
        'app/img/dest/**/*',
        'app/*.html'
    ], {base: 'app'})
    .pipe(dest('build'));
}


function includes() {
    return src(['app/html/*.html', '!app/html/components/*.html'])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(dest('app/'));
}

function startwatch() {
    watch(['app/**/*.scss'], styles);
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    watch(['app/html/**/*.html', '!app/*.html'], includes);
    watch('app/**/*.html').on('change', browserSync.reload);
    watch(['app/images/src/**/*'], images);
}


exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.build = series(cleanbuild, styles, scripts, images, includes, buildcopy);


exports.default = parallel(styles, scripts, images, includes, browsersync, startwatch);