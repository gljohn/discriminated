// Copyright(c) 2016 Andrei Streltsov <andrei@astreltsov.com>
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var gulp = require('gulp');
var msbuild = require('gulp-msbuild');
var exec = require('child_process').exec;

var project = './src/Discriminated/Discriminated.csproj';

function msbuildSettings(configuration) {
    return {
		    targets: ['Clean', 'Build'],
		    properties: { configuration: configuration },
            toolsVersion: '3.5',
            stdout: false
    };
}

gulp.task('build35', [], function () { return gulp.src(project).pipe(msbuild(msbuildSettings('net35'))); });
gulp.task('build40', [], function () { return gulp.src(project).pipe(msbuild(msbuildSettings('net40'))); });
gulp.task('build45', [], function () { return gulp.src(project).pipe(msbuild(msbuildSettings('net45'))); });
gulp.task('build452', [], function () { return gulp.src(project).pipe(msbuild(msbuildSettings('net452'))); });

gulp.task('buildall', ['build35', 'build40', 'build45', 'build452']);

gulp.task('nuget', ['buildall'], function (cb) {
    return exec('nuget.exe pack package.nuspec', { cwd: "." }, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});