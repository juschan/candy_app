/* globals describe it before */
var util = require('util');
const app = require('../app');
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000')


//make sure the server is running before running tests


//tests the index/listing feature
describe('GET /candies', () => {
  
  //test that I get a response
  it('should return a 200 response', (done) => {
      api.get('/candies')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
 
  //tests the index route that shows all candies
  it('should return an array', (done) => {
      api.get('/candies')
      .set('Accept', 'application/json')
      .end((err,response) => {
        //console.log(response.body.candies)
        //console.log(util.isArray(response.body.candies))
        //console.log(typeof(response.body.candies))
        //expect(error).to.be.a('null')
        expect(util.isArray(response.body.candies)).to.be.true;
        done();
      })
  });

  //tests to return all records
  it('should return all the records in the database', (done) => {
      api.get('/candies')
      .set('Accept', 'application/json')
      .end((err,response) => {
        //onsole.log(response.body)
        //expect(error).to.be.a('null')
        //expect(response.body[0]).to.have.property('name');
        //expect(response.body[0]).to.have.property('color');
        expect(response.body.candies).to.have.lengthOf(4);
        done();
      })
  });

}); // closing describe


//tests to get individual candies
describe('GET /candies/:id', () => {
  
  //test that I get a response
  it('should return a 200 response', (done) => {
      api.get('/candies/1')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
 
  //tests for field called 'name' and color
  it("should return an object containing the fields 'name'' and 'color'", (done) => {
      api.get('/candies/1')
      .set('Accept', 'application/json')
      .end((err,response) => {
        //console.log(response.body.candy[0])
        //expect(error).to.be.a('null')
        expect(response.body.candy[0]).to.have.property('name');
        expect(response.body.candy[0]).to.have.property('color');
        done();
      })
  });

}); // closing describe


//Test postings - create new post
describe('POST /candies', () => {
  // before((done) => {
  //   api.post('/candies')
  //   .set('Accept', 'application/json')
  //   .send({ "id": 5, "name": "lollipop", "color": "red"})
  //   .end(done)
  // });


  it('should return a 200 response', (done) => {
    api.post('/candies')
      .set('Accept', 'application/json')
      .send({ "id": 5, "name": "lollipop", "color": "red"})
      .expect(200, done);
  });


  it('should return a 422 if the field color is wrong', (done) => {
      api.post('/candies')
      .set('Accept', 'application/json')
      .send({ "id": 6, "name": "my little pony", "color": "wrong"})
      .expect(422)
      .end((err,response) => {
        //console.log("Client: 422 error received.")
        done();
      });
  }); //closing it


  it('should add an error message if the color field is wrong', (done) => {
      api.post('/candies')
      .set('Accept', 'application/json')
      .send({ "id": 7, "name": "strawberry", "color": "wrong"})
      .end((err,response) => {
         expect(response.body.message).to.equal('wrong color');
         done();
      }); //closing api
  }); //closing it


  it('should add a new candy to the database', (done) => {
      api.post('/candies')
      .set('Accept', 'application/json')
      .send({ "id": 8, "name": "my little pony", "color": "rainbow"})
      .end((err,response) => {
        //console.log(response.body)
        //expect(error).to.be.a('null')
        console.log(response.body)
        expect(response.body.candy[0]).to.have.property('name', 'my little pony');
        expect(response.body.candy[0]).to.have.property('color', 'rainbow');
        done();
      }); //closing api
  }); //closing it

  it('should return an error if the color is wrong', (done) => {
      api.post('/candies')
      .set('Accept', 'application/json')
      .send({ "id": 9, "name": "blueberry", "color": "wrong"})
      .end((err,response) => {
        //console.log(response.body)
        //expect(error).to.be.a('null')
        //console.log(response.body)
        expect(response.body.message).to.equal('wrong color');
        done();
      }); //closing end
  }); //closing it

});// closing describe


//Test puts - edit a current post
describe('PUT /candies/:id', () => {
//   before((done) => {
//     api.put('/candies/1')
//     .set('Accept', 'application/json')
//     .send({ "id": 1, "name": "biscuit", "color": "brown"})
//     .end(done)
//   });

  it('should receive a 200 response', (done) => {
    api.put('/candies/1')
      .set('Accept', 'application/json')
      .send({ "id": 1, "name": "biscuit", "color": "brown"})
      .expect(200, done);
  });

  //get the candy info that we just updated
  it('should update a candy document', (done) => {
      api.get('/candies/1')
      .set('Accept', 'application/json')
      .end((err,response) => {
       //console.log(response.body)
       //expect(error).to.be.a('null')
        expect(response.body.candy[0].name).to.equal('biscuit');
        expect(response.body.candy[0].color).to.equal('brown');
        done();
      }); //closing api
  }); //closing it

});// closing describe



//Test deletions
describe('DELETE /candies/:id', () => {
  // before((done) => {
  //   api.post('/candies')
  //   .set('Accept', 'application/json')
  //   //.send({ "id": 5, "name": "lollipop", "color": "red"})
  //   .end(done)
  // });

  it('should remove a candy document', (done) => {
      api.delete('/candies/1')
      .set('Accept', 'application/json')
      .end((err,response) => {
        //console.log(response.body)
        //expect(error).to.be.a('null')
        //expect(response.body.length).to.equal(5);
        expect(response.body.message).to.eql('deleted');
        done();
      }); //closing api
  }); //closing it


});// closing describe

