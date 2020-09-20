const Registration = require('../models/Registration');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const chai = require('chai');
const chaiHttp = require('chai-http');
const API = 'http://localhost:3000';

const should = chai.should();

chai.use(chaiHttp);


describe('/POST register', () => {
    it('it should register one or more students to a specified teacher, create it does not exist in db', (done) => {
        const reqBody = {
            "teacher": "testTeacher@done",
            "student": ["studefffsdsfdsfdfsdsdnt1@22", "stsdsfsdfssddfsdfdsdsfdssssfsfduffsdfdenft2@666333"]
        }

        chai.request(API)
        .post ('/api/register')
        .send(reqBody)
        .end((err, res) => {
            res.should.have.status(204);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/POST retrievefornotifications', () => {
    it('it should retrieve all notification based on the given teacher email', (done) => {
        const reqBody = {
            "teacher": "testTeacher@done",
            "notification": "Hello students! @stsdsfsdfssddfsdfdsdsfdssssfsfduffsdfdenft2@666333 @dfsds@dfsd"
           };

        chai.request(API)
        .post('/api/retrievefornotifications')
        .send(reqBody)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/POST suspend', () => {
    it('it should suspend a specified student', (done) => {
        const reqBody = {
            "student": "stsdsfsdfssddfsdfdsdsfdssssfsfduffsdfdenft2@666333"
           };

        chai.request(API)
        .post('/api/suspend')
        .send(reqBody)
        .end((err, res) => {
            res.should.have.status(204);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/GET common students', () => {
    it('it should retrieve a list of students common to a given list of teachers', (done) => {
        chai.request(API)
        .get('/api/commonstudents?teacher=testTeacher%40done')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});


