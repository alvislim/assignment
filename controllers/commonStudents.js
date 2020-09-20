const express = require('express');
const app = express();
const httpResponse = require('../util/httpResponse');
const Registration = require('../models/Registration');
const Teacher = require('../models/Teacher');

const response = async (req,res) => {
    try {
        let teacherId = [];

        let teachers = await Teacher.findAll({ where: req.query , attributes: ['teacher_id']});
        if(teachers.length === 0) return httpResponse.responseFormatter(res, 400, false, 'teacher is not in system record', null);

        if(teachers.length > 1) {
            for (let i = 0; i < teachers.length; i++) {
                teacherId.push(teachers[i].dataValues.teacher_id);
            };
        } else {
            teacherId.push(teachers[0].dataValues.teacher_id);
        }

        let result = await Registration.findAll({ where: { teacher_id: teacherId }, attributes: ['student_id']});
        let students = []
 
        if(teachers.length > 1) {
            for (let i = 0; i < result.length; i++) {
                students.push(result[i].dataValues.student_id);
            }
        } else {
            for (let i = 0; i < result.length; i++) {
                students.push(result[i].dataValues.student_id);
            };
            students.push(`student_only_under_teacher_${req.query.teacher}`);
        }

        return res.status(200).json({students})

    } catch (err) {
        return httpResponse.responseFormatter(res, 400, false, err, null);
    }
}

module.exports = app.get('/commonstudents', response);

