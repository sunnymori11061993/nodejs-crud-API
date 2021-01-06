var express = require('express');
const app = require('../app.js');
var router = express.Router();

var employeeSchema = require('../models/employeeModel.js');

router.post('/addEmpployee', async function(req, res, next){
    const { emp_name, emp_number, emp_address } = req.body;
    var record = await new employeeSchema({
        emp_name: emp_name,
        emp_number: emp_number,
        emp_address: emp_address, 
    });
    record.save();

    if(record){
        res.status(200).json({IsSuccess: true, Data:[record], Message:"Employee added."});
    }else{
        res.status(200).json({IsSuccess: false, Data:[], Message:"Employee not added."});
    }
});
router.post('/getEmpployee', async function(req, res, next){
    try {
        var record = await employeeSchema.find();
        console.log(record);
        console.log("Recored Length = "+ record.length);
        if(record.length > 0){
            res.status(200).json({IsSuccess: true, Data:record, Message:"Employee Found."});
        }else{
            res.status(200).json({IsSuccess: false, Data:[], Message:"Employee Not Found."});
        }
    } catch (error) {
        res.status(500).json({IsSuccess:false, Message: error.message});
    }
    
});
router.post('/updateEmpployee', async function(req, res, next){
    const { emp_name, emp_number, emp_address } = req.body;
    const id = req.body.id;
    console.log(req.body);
    try {
        var updateEmployeeData = {
            emp_name: emp_name,
            emp_number: emp_number,
            emp_address: emp_address, 
        };
        let data = await employeeSchema.findByIdAndUpdate(id,updateEmployeeData);
        console.log("mydata = "+data);
        if(data != ""){
            res.status(200).json({IsSuccess: true, Data:data, Message:"Employee updated."});
        }else{
            res.status(200).json({IsSuccess: true, Data:[], Message:"Employee Not updated."});
        }
    } catch (error) {
        res.status(500).json({IsSuccess:false, Message: error.message});
    }
    
});

module.exports = router;