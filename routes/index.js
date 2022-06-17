const express = require('express');
const router = express.Router();

router.get('/exceptions',(req,res)=>{
    console.log('api1');
    res.status(200).send({
        status: "success",
        data: []
    })
})

router.get('/customers',(req,res)=>{
    console.log('api1');
    res.status(200).send({
        status: "success",
        data: []
    })
})

router.get('/billing',(req,res)=>{
    console.log('api1');
    res.status(200).send({
        status: "success",
        data: []
    })
})


module.exports = router;