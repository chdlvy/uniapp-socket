let express = require("express");
let bodyParser = require('body-parser');
let app = express()
let jwt = require("jsonwebtoken")
let fs = require('fs')


// 设置跨域
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Headers", "content-type"); //允许的header类型
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS"); //跨域允许的请求方式
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
});


// 解析application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

let ID = 0;
let friendList = [] //保存每个用户的好友列表

app.post('/login',(req,res)=> {
	console.log(req.body);
	
	// 检查账号密码对不对
	let arr = []
	let data = fs.readFileSync('./data/user_info.json')
	arr = JSON.parse(data.toString());
	
	let find = arr.find(item=> item.account===req.body.account && item.password===req.body.password)
	if(find) {
		console.log('find');
		// 设置token
		let token = jwt.sign({
			account:req.body.account
		},"azrael",{
			expiresIn: 10000
		})
		let result = {
			token,
			user_info:find
		}
		console.log(result)
		res.send(result)
	}
	else {
		res.send('账号未注册')
	}
	
})
app.post('/register',(req,res)=> {
	let account = req.body.account;
	let password = req.body.password;
	let nickName = req.body.nickName;
	let userId = ++ID
	let arr = []
	// 读取user_info.json检查用户是否已经注册过了
	let data = fs.readFileSync('./data/user_info.json')
	arr = JSON.parse(data.toString());
	
	// 计划放入数据库================================================
	let user_info = {
		account,
		password,
		userId,
		nickName
	}
	
	arr.push(user_info)
	
	// 初始化好友列表
	friendList[userId] = []
	
	console.log(arr)
	// 注册的用户消息放入user_info.json中
	fs.writeFile('./data/user_info.json',JSON.stringify(arr),err=> {
		console.log(err)
	})
	res.send('success')
})
// 返回好友列表
app.get('getFriend',(req,res)=> {
	let userId = req.query.userId
	res.send(friendList[userId])
})

// 添加好友
app.post('addFriend',(req,res)=> {
	let friend_info = req.query.friend_info
	let userId = req.query.userId
	// 添加到总好友表中
	friendList[userId].push(friend_info)
	// 返回添加之后的好友列表
	res.send(friendList[userId])
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