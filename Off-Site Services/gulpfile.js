// 'use strict';
var gulp = require('gulp'); // Подключение Gulp
const sass = require('gulp-sass'); // Подключение Sass пакета
const watch = require('gulp-watch'); // Подкючение Watch пакета
const nunjucksRender = require('gulp-nunjucks-render'); // Подключение nunjucksRender пакета
const cleanCSS = require('gulp-clean-css'); // Подключение cleanCSS пакета
const autoprefixer = require('gulp-autoprefixer'); // Подключение autoprefixer пакета

gulp.task('autoprefixer', () =>
    gulp.src('dist/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
);

gulp.task('minify-css', () => {
    return gulp.src('dist/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

const htmlMain = gulp.task('html', () =>
    gulp.src("./src/core/index.html")
        .pipe(nunjucksRender())
        .pipe(gulp.dest("./dist"))
);

gulp.task('sass', function() { // Создаем таск "sass"
    return gulp.src(['src/core/scss/**/*.scss']) // Берем источник
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('dist/css')) // Выгружаем результата в папку css
});

gulp.task('watch', function() {
    gulp.watch(['src/core/scss/**/*.scss'], ['sass']); // Наблюдение за sass файлами в папке sass
});

gulp.task('default', function () {
    return gulp.src('dist/css/*.css')
        .pipe(gulp.dest('dist/css'));
});
