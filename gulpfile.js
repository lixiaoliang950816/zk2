/*
 * @Author: 李晓亮 
 * @Date: 2018-10-15 13:39:24 
 * @Last Modified by: 李晓亮
 * @Last Modified time: 2018-10-15 14:41:00
 */
var gulp = require("gulp");
var server = require("gulp-webserver");
var autoprefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass");
var fs = require("fs");
var path = require("path");
var url = require("url");
var querystring = require("querystring");
//数据
var data = require("./mock/list.json");
//起服务
gulp.task("server", function() {
        return gulp.src("src")
            .pipe(server({
                port: 9090,
                middleware: function(req, res, next) {
                    var pathname = url.parse(req.url).pathname;
                    if (pathname == "/favicon.ico") {
                        res.end("")
                        return false
                    }
                    if (pathname === "/api/list") {
                        res.end(JSON.stringify({ code: 1, data: data }))
                    } else if (pathname === "/api/add") {
                        var arr = [];
                        req.on("data", function(chunk) {
                            arr.push(chunk)
                        })
                        req.on("end", function() {
                            var pramat = querystring.parse(Buffer.concat(arr).toString());
                            var obj = {
                                title: pramat.title,
                                cont: pramat.content
                            }
                            data.unshift(obj);
                            fs.writeFileSync("./mock/list.json", JSON.stringify(data))
                            res.end(JSON.stringify({ code: 0, msg: "发布成功" }))
                        })
                    } else {
                        pathname = pathname === "/" ? "index.html" : pathname;
                        res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                    }
                }
            }))
    })
    //开发环境 dev
gulp.task("devCss", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android>=4.0']
        }))
        .pipe(gulp.dest("./src/css"))
})
gulp.task('watch', function() {
        return gulp.watch('./src/scss/*.scss', gulp.series('devCss'))
    })
    //开发环境
gulp.task("dev", gulp.series('devCss', 'server', 'watch'))