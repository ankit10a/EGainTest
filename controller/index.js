// const fetch = require('node-fetch');
const axios = require('axios');

const exceptionsController = async(req, res)=>{
    const {plantype, deptId, amount} = req.query;
    try {
        //check parameters 
        if(!plantype || !deptId || !amount){
            throw ('incorrect Parameter');
        }else if( deptId.length !== 3 ){
            throw ('incorrect Parameter');
        }

        const externalURL = `https://assessments.reliscore.com/api`; // external Api URL
        // billing Data 
        const billingData = await callExternalAPI(`${externalURL}/billing`,deptId,'get'); 
        // customers Data
        const customersData = await callExternalAPI(`${externalURL}/customers`,'get');

        Promise.all([billingData, customersData]);

        // getting All customers from objects
        let allCustomers = [...Object.keys(billingData.data),...Object.keys(customersData.data)];
        allCustomers = [...new Set(allCustomers)];

        // api logic implementation
        const exceptions= [];
        const missing = [];
        for(const ele of allCustomers){
            const billing = billingData.data[ele];
            const customersPlan = customersData.data[ele];
            if(billing && !customersPlan){
                missing.push(ele);
            } else if(billing > amount && plantype == customersPlan){
                exceptions.push(ele);
            } 
        }
        
        return res.status(200).send({
            status: 'success',
            data: {exceptions,missing}
        })
        
    } catch (error) {
        console.error("errror--->",error)
        return res.status(400).send({
            status: 'error',
            message: error
        })
    }

}


const callExternalAPI = (URL,parameter,method)=> {
    return new Promise ((res,rej)=>{
        try {
            let url = URL;
            if(parameter){
                url = `${url}/${parameter}`
            }
            // console.log('chcke',url,method)
            const result = axios({
                method,
                url,
            }).then(resp => {
                // console.log("axois resp==>",resp);
                if(resp.data.status === "error"){
                    throw (resp.data)
                }else{
                    return resp.data;
                }
            }, (err) => {
                // console.log("api err====>",err);
                throw (err);
                // return err;
            });
            // console.log("res",result)
            res(result)
        } catch (error) {
            rej(error)
        }
    })
}

module.exports = exceptionsController;