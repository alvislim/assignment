let initCallback;
const express = require('express');
const app = express();

const router = require('./router');

const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sequelize = require('./config/database');

app.use('/api', router);

const Registration = require('./models/Registration');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');

const startDB = async () => {
    try {
        await sequelize.authenticate();
        Student.belongsToMany(Teacher, { through: Registration, as: 'students', foreignKey: 'student_id' });
        Teacher.belongsToMany(Student, { through: Registration, as: 'teachers', foreignKey: 'teacher_id' });
        app.listen(PORT, () => {
            console.log(`server started on port ${PORT}`)
        });
    } catch (err) {
        console.log(err);
    }
}

startDB();







