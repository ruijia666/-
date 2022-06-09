let express = require("express");
const { render } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const secretKey = "nihao 0.0 233";
let router = express.Router();
// let session = require('express-session')
let Customer = require("./customer");

//注册成功保存信息
router.post("/api/login/save", async (req, res) => {
  let newpeople = await Customer.findOne({
    pid: req.body.pid,
    password1: req.body.password1,
  });
  if (newpeople) {
    return res.send({
      status: 0,
      message: "用户已存在",
    });
    console.log(req.body);
  } else {
    new Customer(req.body).save(function (err) {
      if (err) {
        res.send({
          status: 3,
        });
      }
      return res.send({
        status: 1,
      });
    });
  }
  return;
});

//保存好信息，开始登录
router.post("/api/sign", async (req, res) => {
  //  req.body = JSON.parse(req.body)
  let people = await Customer.findOne({
    pid: req.body.pid,
    password1: req.body.password,
  });
  if (people) {
    const tokenStr = jwt.sign({ name: people.neame }, secretKey, {
      expiresIn: "10h",
    });
    return res.send({
      status: 1,
      name: people.name,
      // 为了客服端方便使用 Token,在服务器 自己拼接Bearer的前缀
      token: "Bearer " + tokenStr,
    });
  } else {
    return res.send({
      status: 0,
      message: '无效的账号或者密码',
    });
  }
});

//用session登录
// router.post('/api/visit',(req,res)=>{
//   console.log(req.session.islogin);
//   //从session中获取用户的名称，响应给客服端
//   if(!req.session.islogin){
//     return res.send({ status: 1 , msg: 'fail'})
//   }
//   res.send({
//     status:0,
//     msg:'success',
//     username:req.session.user
//   })
// })
//清空当前客服端对应session信息
// router.post('/api/logout',(req,res)=>{
//   req.session.destroy()
//   res.send({
//     status:0,
//     msg:'退出登录成功'
//   })
// })
//验证token
// router.post('/admin/token',(req,res)=>{
//   response.setHeader('Access-Control-Allow-Headers', '*');
//   const Token = req.headers.Authorization;
//   if (Token !== null) {
//     // 有token，说明是管理员，下面验证管理员权限
//     jwt.verify(Token, secretKey, (err) => {
//       if (err) {
//         if (err.name === "JsonWebTokenError") {
//           res.status(403).send({ message: "授权失败，无权访问" })
//         } else if (err.name === "TokenExpiredError") {
//           res.status(403).send({ message: '权限过期，请重新登陆' });
//         } else {
//           res.status(403).send({ message: "授权失败，未知错误" })
//         }
//       }
//       // 没有错误，认证成功，授予访问权限
//       res.send({
//         status:0,
//         msg:'success',
//       })
//     });
//   } else {
//     res.status(401).send({ message: '非管理员身份，无权访问' });
//   }
// })
// router.get('/admin/aa',(req,res)=>{
//   res.send({
//     status : 1,
//   })
// })
router.post("/admin/token", async (req, res) => {
  let Token = req.headers.authorization;
  Token = Token.split(' ')
  console.log(Token);
  Token=Token[1]
  if (Token !== null) {
    // 有token，说明是管理员，下面验证管理员权限
    return jwt.verify(Token, secretKey, (err) => {
      if (err) {
        console.log(err);
        if (err.name === "JsonWebTokenError") {
          res.status(403).send({ message: "授权失败，无权访问" });
        } else if (err.name === "TokenExpiredError") {
          res.status(403).send({ message: "权限过期，请重新登陆" });
        } else {
          res.status(403).send({ message: "授权失败，未知错误" });
        }
      } else {
        // 没有错误，认证成功，授予访问权限
        res.send({
          status: 0,
          msg: "success",
        });
      }
    });
  } else {
    res.status(401).send({ message: "非管理员身份，无权访问" });
  }
});
module.exports = router;
