const express = require('express');
const app = express();
const httpResponse = require('../util/httpResponse');
const Registration = require('../models/Registration');
const Teacher = require('../models/Teacher');

const response = async (req, res) => {
    try {
        let teacherId = [];
        let students = [];
        let length;

        typeof req.query.teacher === 'string' ? length = 1 : length = req.query.teacher.length;
        let teachersRecord = await Teacher.findAll({ where: req.query, attributes: ['teacher_id'] });
        if (teachersRecord === 0 || teachersRecord.length !== length) return httpResponse.responseFormatter(res, 400, false, 'teacher is not in system record', null);
        
    
        
        if (teachersRecord.length > 1) {
            for (let i = 0; i < teachersRecord.length; i++) {
                teacherId.push(teachersRecord[i].dataValues.teacher_id);
            };
        } else {
            teacherId.push(teachersRecord[0].dataValues.teacher_id);
        }


        let result = await Registration.findAll({ where: { teacher_id: teacherId }, attributes: ['student_id', 'teacher_id'] });

        if (teachersRecord.length > 1) {
            for (let i = 0; i < result.length; i++) {
                students.push(result[i].dataValues.student_id)
            }
            students = students.reduce((acc, el, i, arr) => {
                if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
              }, []);
        } else {
            for (let i = 0; i < result.length; i++) {
                students.push(result[i].dataValues.student_id);
            };
            students.push(`student_only_under_teacher_${req.query.teacher}`);
        }

        return res.status(200).json({ students })

    } catch (err) {
        console.log(err)
        return httpResponse.responseFormatter(res, 400, false, err, null);
    }
}

module.exports = app.get('/commonstudents', response);

