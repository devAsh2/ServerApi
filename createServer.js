const express = require('express')
var cors = require("cors");
const jwt = require('jsonwebtoken')
const app = express();
app.use(cors());
var fs = require('fs')
const path = require('path')
app.use(express.json({ limit: '1mb' }))
var data1 = fs.readFileSync(__dirname + "/" + "UserApi/Api.json", "utf-8");
var file = path.join(__dirname, "/UserApi/RegisteredClients.json")

//endpoint to get list of books
app.get('/get', function (req, res) {
    res.json(data1)
})

//endpoint to post list of books
app.post('/post', (req, res) => {
    var n = req.body
    var bookrec = JSON.parse(data1)
    bookrec.push(n)
    console.log(bookrec)
    var json = JSON.stringify(bookrec, null, 2)
    fs.writeFileSync(data1, json)
    var data2 = fs.readFileSync(data1, "utf-8")
    res.json(data2)

});

//endpoint to update books
app.put("/:id", (req, res) => {
    try {
        var data3 = fs.readFileSync(data1, "utf-8")
        var ParsedData2 = JSON.parse(data3);
        var id = req.body.id;
        ParsedData2[id].name = req.body.name
        ParsedData2[id].type = req.body.type
        var stringUpdateData = JSON.stringify(ParsedData2, null, 2)
        fs.writeFileSync(data1, stringUpdateData)
        var data2 = fs.readFileSync(data1, "utf-8")
        console.log(data2)
        res.json(data2)
    } catch (err) {
        res.send("Error");
    }
});

//endpoint to signup users
app.post("/api-clients/signup", (req, res) => {
    try {
        var data2 = fs.readFileSync(file, "utf-8")

        if (data2.length == 0) {

            var obj = [req.body]
            fs.writeFileSync(file, JSON.stringify(obj))
            var data7 = fs.readFileSync(file, "utf-8")
            console.log(data7)
            res.send('User Created')
        }
        else {
            var data3 = fs.readFileSync(file, "utf-8")
            var obj = JSON.parse(data3)
            obj.push(req.body)
            var jsn = JSON.stringify(obj, null, 2)
            fs.writeFileSync(file, jsn)
            var data4 = fs.readFileSync(file, "utf-8")
            console.log(data4)
            //var datastr = { id: req.body.usrid, password: req.body.pass, status: "saved" }
            res.status(201).send('User Created')
        }
        
    } catch (err) {
        res.send("Error")
    }
})

//endpoint to login
app.post("/api-clients/signin", (req, res) => {
    const users = fs.readFileSync(file, "utf-8")
    const user = JSON.parse(users)
    const regUser = user.filter(it=>it.server===req.body.usrid)
    console.log(regUser)
    if(regUser==null){
        return res.status(400).send("User doesn't exist")
    }
    else {
        function genAccessToken(){
            const user =req.body
            jwt.sign({user},config.secret,{expiresIn:'168h'},(err,token)=>{
            res.json({success:true,message:'Success',token:token,user:{userid:user.usrid,password:user.pass}})
            })
        }
        var token = genAccessToken()
        return res.json(token)
    }
})

app.use((req,res,next)=>{
    const token = req.headers['authorization']
    if(!token){
        res.json({success:false,message:"No token provided"})
    }
    else{
        jwt.verify(token,config.secret,(err,decoded)=>{
            if(err){
                res.json({success:false,message:"Token invalid:"+err})
            }
            else{
                req.decoded=decoded;
                next()
            }
        })
    }
})

//create server to listen at port 9000
var server = app.listen(9000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Rest Api demo app listening at http://%s:%s", host, port)
})
