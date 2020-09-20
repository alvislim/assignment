const express = require('express');
const app = express();
const httpResponse = require('../util/httpResponse');
const Registration = require('../models/Registration');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student')

const response = async (req, res) => {
    try {
        const { teacher, notification } = req.body;

        const teacherId = await Teacher.findOne({ where: { teacher: teacher } });

        if(!teacherId) return httpResponse.responseFormatter(res, 400, false, 'teacher is not registered in the db', null);

        const id = parseInt(teacherId.dataValues.teacher_id);
        let removeDupes = new Set();
        let studentsUnderTeacher = [];
        const array = notification.split(' @');

        for (let i = 0; i < array.length; i++) {
            if (array[i].includes('@')) {
                let studentNotSuspended = await Student.findOne({ where: { student: array[i], isSuspended: true } });
                if (!studentNotSuspended) {
                    removeDupes.add(array[i])
                };
            };
        };



        const registeredStudent = await Registration.findAll({ where: { teacher_id: id }, attribute: 'student_id' });

        for (let i = 0; i < registeredStudent.length; i++) {
            studentsUnderTeacher.push((registeredStudent[i].dataValues.student_id))
        };
        const studentNotSuspended = await Student.findAll({ where: { student: studentsUnderTeacher, isSuspended: false } });

        for (let i = 0; i < studentNotSuspended.length; i++) {
            removeDupes.add(studentNotSuspended[i].dataValues.student)
        };

        let recipients = Array.from(removeDupes);
        return res.status(200).json({ recipients });

    } catch (err) {
        return httpResponse.responseFormatter(res, 400, false, err, null);
    }
}

module.exports = app.post('/retrievefornotifications', response);

