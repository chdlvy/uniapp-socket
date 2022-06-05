let express = require("express");
let bodyParser = require('body-parser');
let app = express()
let jwt = require("jsonwebtoken")
let fs = require('fs')
// 解析application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

let ID = 0;

app.post('/login',(req,res)=> {
	console.log(req.body);
	
	// 设置token
	let token = jwt.sign({
		username:req.body.account
	},"azrael",{
		expiresIn: 10
	})
	console.log(token);
	res.send(token)
})
app.post('/register',(req,res)=> {
	let account = req.body.account;
	let password = req.body.password;
	let userName = req.body.userName;
	
	let arr = []
	// 读取user_info.json检查用户是否已经注册过了
	fs.readFile('./data/user_info.json',(err,data)=> {
		if(err) {
			console.log(err);
		}
		arr = JSON.parse(data.toString());
		
		console.log(arr);
	})
	
	// 计划放入数据库================================================
	// 注册的用户消息放入user_info.json中
	let user_info = {
		account,
		password,
		userId:++ID,
		userName
	}
	arr.push(user_info)
	fs.writeFile('./data/user_info.json',JSON.stringify(arr),err=> {
		console.log(err)
	})
	res.send('register')
})

// 验证token
app.get("/verify",(req,res)=> {
	let token = req.query.token;
	 jwt.verify(token,"azrael",(err,decode)=>{
	        // console.log("err",err) //null就代表没有报错
	        console.log("decode--",decode) 
	        if(err){ //一旦报错了，说明用户信息校验失败
	            res.send({ 
	                err:1
	            })
	        }else{ //校验成功
	            //3.数据返回给前端
	            res.send({
	                err:0,
	            })
	        }
	    })
})
module.exports = app