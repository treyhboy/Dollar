const express = require('express');
const app = express();
const bp = require('body-parser');
const user = require('./db').user;
const Investment = require('./db').investment;
const  spending = require('./db').spendings;
const reminder = require('./db').reminder;


app.use('/', express.static(__dirname + "/public_static"))

app.use(bp.urlencoded({extended: true}))
app.use(bp.json())

app.post('/signup',(req,res) => {
    user.create({
        name:req.body.name,
        username:req.body.email,
        pass:req.body.password
        }).then(function () {
            res.send({success:true})
        }).catch(function(err)
        {
            throw err;
        });
});
app.post('/login',(req,res)=> {
    user.findAll({where: {username: req.body.email, pass: req.body.password}}).then(
        function (db) {
            if(db[0]) {
                console.log('found')
                res.send({success:true,key: 'success',name:db[0].name})
            }else {
                console.log('not');
                res.send({status: 'not found'})

            }
        }).catch(function (err) {
        console.log('err');
            res.send(err)
    })
});
app.post('/spen',(req,res)=> {
    spending.findAll({where: {user: req.body.user}}).then(
        function (db) {
            if(db[0]) {
                res.send({status: 'found',data:db})
            }else {
                res.send({status: 'not found'})

            }
        }).catch(function (err) {
        console.log('err');
        res.send(err)
    })
});
app.post('/down',(req,res)=> {
    reminder.findAll({where: {user: req.body.user}}).then(
        function (db) {
            if(db[0]) {
                res.send({status: 'found',data:db})
            }else {
                res.send({status: 'not found'})

            }
        }).catch(function (err) {
        console.log('err');
        res.send(err)
    })
});
app.post('/invest',(req,res)=> {
    Investment.findAll({where: {user: req.body.user}}).then(
        function (db) {
            if(db[0]) {
                res.send({status: 'found',data:db})
            }else {
                res.send({status: 'not found'})

            }
        }).catch(function (err) {
        console.log('err');
        res.send(err)
    })
});
app.post('/tran',(req,res)=> {
    console.log(req.body.type);
    if(req.body.type == "Spending") {
        spending.create({
            user:req.body.user,
            detail: req.body.det,
            amount: req.body.amt,
            Mode: req.body.mode
        }).then(
            function () {
                console.log('spending');
                res.send({status:true})
            }).catch(function (err) {
                console.log('err');
                 res.send(err);
        })
    }
    else
    {
        Investment.create({
            user:req.body.user,
            detail: req.body.det,
            amount: req.body.amt,
            Mode: req.body.mode
        }).then(
            function () {
                console.log('investment');
                res.send({status:true})
            }).catch(function (err) {
            console.log('err');
            res.send(err);
        })

    }
});
app.post('/rem',(req,res)=> {
    reminder.create({
            user:req.body.user,
            detail: req.body.det,
            amount: req.body.amt,
            date: req.body.dat
            }).then(
            function () {
                res.send({status:true})
            }).catch(function (err) {
            console.log('err');
            res.send(err);
        })
});
app.post('/overview1',(req,res)=> {
    spending.findAll({
        where: {
                user:req.body.user
        }
    }).then(result => {
            res.send(result);
        });
});

app.post('/overview2',(req,res)=> {
    Investment.findAll({
        where: {
            user:req.body.user
        }
    }).then(result => {
        res.send(result);
    });
});



app.listen((process.env.PORT||9098), function () {
    console.log("Server started on http://localhost:");
});
