import app from '../server.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

describe('POST /api/auth/sigup', () => {
    //Successful sign up
    it("Should create user account and store it in the database and status code of 200", (done) => {
        chai.request(app)
            .post('/api/auth/signup')
            .send({
                "email": "test@email.com",
                "password": "testpassword"
            })
            .end((err, res) => {
                if (err)
                    return done(err);
                res.should.have.status(200);
                expect(res.body.error).to.be.equal(undefined);
                expect(res.body.token).to.not.be.null;
                console.log('Res body message: ', res.body.message);
                console.log('Token: ', res.body.token);
                done();
            })
    })

    //Unsuccessful sign up due to user acocunt already existing
    it("Should not create user account and not store anything in database. Should display account already exists, and return a status code of 500", (done) => {
        chai.request(app)
        .post('/api/auth/signup')
        .send({
            "email": "test@email.com",
            "password": "testpassword"
        })
        .end((err, res) => {
            res.should.have.status(500);
            expect(res.body).to.be.a('object');
            console.log('Res body message: ', res.body.message);
            console.log('Res error message: ', res.error.message);
            done();
        })
    })

    //Unsuccessful sign up due to entered password being too short
    it("Should not create user account and not store anything in database. Should display password is too short, and return a status code of 500", (done) => {
        chai.request(app)
        .post('/api/auth/signup')
        .send({
            "email": "test@email.com",
            "password": "short"
        })
        .end((err, res) => {
            res.should.have.status(500);
            expect(res.body).to.be.a('object');
            console.log('Res body message: ', res.body.message);
            console.log('Res error message: ', res.error.message);
            done();
        })
    })

    //Unsuccessful sign up due to entered email not being valid
    it("Should not create user account and not store anything in database. Should display email is not valid, and return a status code of 500", (done) => {
        chai.request(app)
        .post('/api/auth/signup')
        .send({
            "email": "testtemail.com",
            "password": "testpassword"
        })
        .end((err, res) => {
            res.should.have.status(500);
            expect(res.body).to.be.a('object');
            console.log('Res body message: ', res.body.message);
            console.log('Res error message: ', res.error.message);
            done();
        })
    })
});
