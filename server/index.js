var app = require('koa')()
var path = require('path')
var chalk = require('chalk')
var proxy = require('koa-proxy')
var webpack = require('webpack')
var webpackDevMiddleware = require('koa-webpack-dev-middleware')
var webpackHotMiddleware = require('koa-webpack-hot-middleware')
var config = require(path.normalize(path.resolve('./webpack.dev.conf.js')))

var compiler, hotMiddleware, port, serverConfig

serverConfig = Object.assign({}, {
    port: 8080
}, config.server)

config.plugins = config.plugins || []
config.devServer = config.devServer || {}
port = process.argv[2] || serverConfig.port

config.devServer.hot = true
config.devServer.publicPath = config.output.publicPath

if (Array.isArray(config.entry)) {
    config.entry.unshift('webpack-hot-middleware/client')
} else {
    for (var key of Object.keys(config.entry)) {
        config.entry[key].unshift('webpack-hot-middleware/client?reload=true')
    }
}

config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
config.plugins.unshift(new webpack.NoErrorsPlugin())

delete config.server
compiler = webpack(config)

hotMiddleware = webpackHotMiddleware(compiler, {
    log: function() {
        if (arguments[0].indexOf('building') > -1) {
            return
        }

        console.log(chalk.gray(" > " + arguments[0]))
    }
})

if(serverConfig.proxy){
    app.use(proxy(serverConfig.proxy))
}

app.use(webpackDevServer())
app.use(function *(next) {
    yield next
})
app.use(function *(next){
    this.body = yield readFile(path.join(compiler.outputPath, 'index.html'))
    this.type = 'text/html'
})
app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }

    console.log(chalk.blue(' # Access URLs:'))
    console.log(chalk.gray(' ----------------------------------------'))
    console.log('     Local: ' + chalk.green('http://localhost:' + port))
    console.log(chalk.gray(' ----------------------------------------'))
    console.log('')
})

function webpackDevServer() {
    return compose([webpackDevMiddleware(compiler, config.devServer), hotMiddleware])
}

function compose(middleware) {
    return function*(next) {
        if (!next) {
            next = function* noop() {}
        }

        var i = middleware.length

        while (i--) {
            next = middleware[i].call(this, next)
        }

        return yield* next
    }
}

function *readFile(filepath) {
    return new Promise(function(resolve, reject) {
        compiler.outputFileSystem.readFile(filepath, function(err, result) {
            if(err) {
                reject(err)
                return
            }

            resolve(result)
        })
    })
}
