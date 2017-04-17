/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    (<any>window).System.config({
        paths: {
            // paths serve as alias
            'npm:': '../node_modules/'
        },
        baseURL: '../',
        defaultJSExtensions: "js",
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            'app': 'app',

            // angular bundles
            '@angular/core': 'https://npmcdn.com/@angular/core/bundles/core.umd.js',
            '@angular/common': 'https://npmcdn.com/@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'https://npmcdn.com/@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'https://npmcdn.com/@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'https://npmcdn.com/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'https://npmcdn.com/@angular/http/bundles/http.umd.js',
            '@angular/router': 'https://npmcdn.com/@angular/router/bundles/router.umd.js',
            '@angular/forms': 'https://npmcdn.com/@angular/forms/bundles/forms.umd.js',

            // other libraries
            'rxjs':                      'https://npmcdn.com/rxjs',
            'angular-in-memory-web-api': 'https://npmcdn.com/angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            '@werpu/picker': "../../dist_ng2/DatepickerFinal-amd.js"
        },
        meta: {
            "../../dist_ng2/DatepickerFinal.js": {
                type:"amd"
            }
        }

    });
})(this);
