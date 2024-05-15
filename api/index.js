let api = {};
let apiContext = require.context("./modules", true, /\.js$/);
apiContext.keys().forEach((jsPath) => {
    const module = apiContext(jsPath).default || apiContext(jsPath)    
    const fnNames = Object.keys(module)
    for(let index in fnNames) {
        let name = fnNames[index]
        if(Object.prototype.toString.call(api[name]) == '[object Function]') {
            throw `文件 ${ jsPath } 中定义的 ${ name } 方法名重复...`
        }
    }

    api = {
        ...api,
        ...module
    }
})

export default api