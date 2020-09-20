const express = require('express');
const app = express();
const httpResponse = require('../util/httpResponse');
const Student = require('../models/Student');

const response = async (req,res) => {
    try {
        let { student } = req.body;

        let suspension;

        let studentExist = await Student.findOne({ where: { student: student }});
        if(!studentExist) return httpResponse.responseFormatter(res, 400, false, 'student does not exist', null);

        studentExist.dataValues.isSuspended ? suspension = false : suspension = true
 
        let suspendStudent = await studentExist.update({ isSuspended: suspension });
        
        res.status(204).json({suspendStudent})
    } catch (err) {
        return httpResponse.responseFormatter(res, 400, false, err, null);
    }
}

module.exports = app.post('/suspend', response);

