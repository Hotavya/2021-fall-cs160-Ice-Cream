import app from '../server.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

describe('POST /api/auth/sigin', () => {
    it("Should login user, return auth token, and status code of 200", (done) => {
        chai.request(app)
            .post('/api/auth/signin')
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

    it("Should not login user with incorrect email return a status code of 500", (done) => {
        chai.request(app)
            .post('/api/auth/signin')
            .send({
                "email": "doestnotexist@email.com",
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

    it("Should not login user with incorrect password return a status code of 401", (done) => {
        chai.request(app)
            .post('/api/auth/signin')
            .send({
                "email": "test@email.com",
                "password": "testpasswordlol"
            })
            .end((err, res) => {
                res.should.have.status(401);
                expect(res.body).to.be.a('object');
                console.log('Res body message: ', res.body.message);
                console.log('Res error message: ', res.error.message);
                done();
            })
    })
});