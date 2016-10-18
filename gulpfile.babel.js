'use strict'
const gulp = require('gulp'),
    path = require('path'),
    rename = require('gulp-rename'),
    template = require('gulp-template'),
    shell = require('gulp-shell'),
    inject = require('gulp-inject-string'),
    yargs = require('yargs').argv,
    gutil = require('gulp-util');

const root = './';

const resolveTo = function (resolvePath) {
    return function (glob) {
        glob = glob || '';
        return path.resolve(path.join(root, resolvePath, glob));
    }
};

const resolveToApp = resolveTo('app'); // app/{glob}
const resolveToComponents = resolveTo('app/components'); // app/components/{glob}

const paths = {
    blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**')
};


gulp.task(
    'new', function () {
        const cap = function (val) {
            let ar = val.split("-").map(a => a.charAt(0).toUpperCase() + a.slice(1))
            return ar.join("")
        };


        //path.resolve(resolveToApp())

        const args = getArgs();
        const name = args[0];
        if (!name) {
            console.log("enter --[name] argument");
            return
        }

        const upCaseName = cap(name);
        const parentPath = args.p || '';
        const destPath = path.join(resolveToComponents(), parentPath, name);


        const directive = args['d'];

        if (directive) {
            console.log("command coming soon...");
            return
            console.log("Create directive", name);
            console.log("destPath", destPath);
        } else {
            console.log("Create component", name);
            console.log(destPath);
            gulp.src(paths.blankTemplates)
                .pipe(
                    template(
                        {
                            name: name,
                            upCaseName: upCaseName
                        }
                    )
                )
                .pipe(
                    rename(
                        function (path) {
                            path.basename = path.basename.replace('temp', name);
                        }
                    )
                )
                .pipe(gulp.dest(destPath));

            const parentComponent = args.p || ''

            if (args.r) {
                const parentRouterFile = path.join(resolveToApp(), parentComponent, '/index.ts');
                console.log("Routed Component");
                console.log("Modify", parentRouterFile);
                gulp.src(parentRouterFile)
                    .pipe(
                        inject.prepend(
                            `import  './${name}/${name}.index.ts';\n`
                        )
                    )
                    .pipe(gulp.dest(f => f.base))
            } else {
                const parentComponentFile = path.join(resolveToApp(), '/index.ts');
                console.log("Base Component");
                console.log("Modify", parentComponentFile);
                const cpath = parentComponent ? `components/${parentComponent}/${name}` : `components/${name}`;
                gulp.src(parentComponentFile)
                    .pipe(
                        inject.prepend(
                            `import './${cpath}';\n`
                        )
                    )
                    .pipe(gulp.dest(f => f.base))
                console.log("!")

            }
        }
    }
);


function getArgs() {
    var args = [];
    for (var key in gutil.env) {
        if (gutil.env.hasOwnProperty(key) && key !== '_' && key !== 'color' && key !== 'gulpfile' && gutil.env[key]) {
            args.push(key);
            args[key] = gutil.env[key];
        }
    }
    return args;
}
