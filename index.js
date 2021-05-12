const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/donuts", {
     useNewUrlParser: true ,
     useUnifiedTopology: true
    });


app.post('/api/donuts',(req,res)=>{
    db.Donut.create(req.body).then(newDonut=>{
        res.json(newDonut)
    }).catch(err=>{
        res.status(500).json(err);
    })
})

app.get("/api/donuts",(req,res)=>{
    db.Donut.find().then(allDonuts=>{
        res.json(allDonuts)
    }).catch(err=>{
        res.status(500).json(err);
    })
})
app.post('/api/orders',(req,res)=>{
    db.Order.create(req.body).then(newOrder=>{
        res.json(newOrder)
    }).catch(err=>{
        res.status(500).json(err);
    })
})

app.get("/api/orders",(req,res)=>{
    db.Order.find().then(allOrders=>{
        res.json(allOrders)
    }).catch(err=>{
        res.status(500).json(err);
    })
})

app.put("/api/orders/adddonut/:orderid/:donutid",(req,res)=>{
    console.log(req.params)
    db.Order.findOneAndUpdate({_id:req.params.orderid},{$push:{donuts:req.params.donutid}},{new:true}).then(updatedOrder=>{
        res.json(updatedOrder)
    }).catch(err=>{
        res.status(500).json(err);
    })
})

app.get("/checkout/:orderid",(req,res)=>{
    db.Order.findOne({
        _id:req.params.orderid
    }).populate("donuts").then(finalOrder=>{
        // const total = finalOrder.donuts.reduce((runningTotal,currentDonut)=>{
        //     return runningTotal + currentDonut.price 
        // },0)
        // const myObj = {
        //     ...finalOrder
        // }
        // myObj.totalPrice = total
        // console.log(myObj,total)
        res.json(finalOrder)
    }).catch(err=>{
        res.status(500).json(err);
    })
})

app.listen(PORT,()=>{
    console.log("listenin on port "+ PORT)
})
