let express = require('express')

let path = require('path')

// let session = require('express-session')

//导入用于将客户端发送过来的JWT字符串，解析还原成json对象的包
const expressJWT= require("express-jwt");
//secret密钥
const secretKey = 'nihao 0.0 233'


let bodyParser = require('body-parser')


const { model } = require('mongoose')

let app = express()

app.use('/node_modules/',express.static('../node_modules'))
//配置session中间件
// 

//跨域
const cors = require("cors");
app.use(cors()); //使用cors中间件
 
app.get('/api/get',(req, res) => {
  // 通过 req.query 获取客户端通过查询字符串，发送到服务器的数据
  const query = req.query;
  // 调用 res.send() 方法，向客户端响应处理的结果
  res.send({
    status: 0, // 0 表示处理成功，1 表示处理失败
    msg: "GET 请求成功！", // 状态的描述
    data: query, // 需要响应给客户端的数据
  });
})


//解析token的中间件
//必须设置algorithms且放在seret后面
//一定要在配置路由前配置
app.use(expressJWT(({ secret:secretKey,algorithms:['HS256'] })).unless({ path: [/^\/api\//]}))

let router = require('./router')



app.use(bodyParser.urlencoded({ extended:false }))

app.use(bodyParser.json())

app.engine('html',require('express-art-template'))

app.use(router)

// 配置跨域请求中间件(服务端允许跨域请求)
var allowCors = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin); // 设置允许来自哪里的跨域请求访问（req.headers.origin为当前访问来源的域名与端口）
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"); // 设置允许接收的请求类型
    res.header("Access-Control-Allow-Headers", "Content-Type,request-origin"); // 设置请求头中允许携带的参数
    res.header("Access-Control-Allow-Credentials", "true"); // 允许客户端携带证书式访问。保持跨域请求中的Cookie。注意：此处设true时，Access-Control-Allow-Origin的值不能为 '*'
    res.header("Access-control-max-age", 1000); // 设置请求通过预检后多少时间内不再检验，减少预请求发送次数
    next();
};
app.use(allowCors); // 使用跨域中间件

app.use((err,req,res,next)=>{
  //这次错误是由token解析失败导致的
  if(err.name === 'UnauthorizedError'){
    return res.send({
      status: 401,
      message:'无效的token'
    })
  }
  res.send({
    status:500,
    message:'未知的错误',
  })
})

app.listen(3000,function(){
    console.log('running...');
})
