const express = require('express');
const app = express();
const httpResponse = require('../util/httpResponse');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const response = async (req, res) => {
    try {
        const { teacher, student } = req.body;

        if (!student && !teacher) return httpResponse.responseFormatter(res, 400, false, 'teacher and student field is empty', null);
        if (!teacher) return httpResponse.responseFormatter(res, 400, false, 'teacher field is empty', null);
        if (!student) return httpResponse.responseFormatter(res, 400, false, 'student field is empty', null);
        

        let teacherRecord = await Teacher.findOne({ where: { teacher } });
        if (!teacherRecord) {
            let teacherCreation = await Teacher.create({ teacher });
            for (let i = 0; i < student.length; i++) {
                const studentExist = await Student.findOne({ where: { student: student[i] }})
                if(!studentExist) {
                    await Student.create({ student: student[i] });
                    await teacherCreation.addTeacher(student[i]);
                } else {
                    await teacherCreation.addTeacher(student[i]);
                }
            }
        } else {
            for (let i = 0; i < student.length; i++) {
                const studentExist = await Student.findOne({ where: { student: student[i] }})
                if(!studentExist) {
                await Student.create({ student: student[i] });
                await teacherRecord.addTeacher(student[i]);
            } else {
                await teacherRecord.addTeacher(student[i]);
            } 
        }
    }
        return res.status(204).json({ message: 'records successfully updated' });

    } catch (err) {
        return httpResponse.responseFormatter(res, 400, false, 'server error', err);
    }
};

module.exports = app.post('/register', response);
