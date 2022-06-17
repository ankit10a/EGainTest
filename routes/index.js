const express = require('express');
const router = express.Router();

router.get('/exceptions',(req,res)=>{
    console.log('api1');
    res.status(200).send({
        status: true,
        data: []
    })
})

router.get('/customers',(req,res)=>{
    console.log('api1');
    res.status(200).send({
        status: true,
        data: []
    })
})

router.get('/billing',(req,res)=>{
    console.log('api1');
    res.status(200).send({
        status: true,
        data: []
    })
})


module.exports = router;