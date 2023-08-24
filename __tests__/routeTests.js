const request = require('supertest');

const server = 'http://localhost:3000';
const fs = require('fs');
const path = require('path');
//const testJsonFile = require(path.resolve(__dirname, '../server/db/favorites.test.json'));
//console.log(testJsonFile);
describe('Testing Route integration', () => {
  let header;

  beforeEach({
    const credentials = {
      username: "andrew" ,
      password: "password123",
    };
    
    // Make request to login   
    const response = await request.post("/Auth/Login").send(credentials);
    
    // Get cookies from response
    header = response.header;
    
    // Make request to a private route
  });
  

  describe('/Favorite', () => {
    
    describe('GET', () =>{
      
      it('response with 200 status and application.json', () => {
        // Make request to a private route
        const response_with_cookies = await request
            .get("/Favorite")
            .set("Cookie", [...header["set-cookie"]]) // this line I add cookies...
            .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });

  describe('/Favorite/Add', () => {  
    describe('POST', () => {        
        const favoriteMovie = 
          {
            name: 'Harry Potter',
            vote_average: 8,
            first_air_date: '09/01/2000',
            overview: 'A random Day',
            poster_path: 'abc.jpg'};

        return request(server)
          .post('/Favorite/Add')
          .set("Cookie", [...header["set-cookie"]])
          .send(favoriteMovie)
          .expect(200);
      });
      
      it('responds with the updated favorite', async () => {
        const favoriteMovie2 = 
          {
            name: 'Harry Potter 2',
            vote_average: 8,
            first_air_date: '09/01/2000',
            overview: 'A random Day',
            poster_path: 'abc.jpg'};

        let result = await request(server)
          .post('/Favorite/Add')
          .set("Cookie", [...header["set-cookie"]])
          .send(favoriteMovie2)
          .expect(200)
        //console.log('result body is: ', result.body);
        expect(result.body.name).toEqual(favoriteMovie2.name);
        expect(result.body.vote_average).toEqual(favoriteMovie2.vote_average);
        expect(result.body.first_air_date).toEqual(favoriteMovie2.first_air_date);
        expect(result.body.overview).toEqual(favoriteMovie2.overview);
        expect(result.body.poster_path).toEqual(favoriteMovie2.poster_path);
      })
  })


  describe('/Favorite/:id', () => {
    describe('DELETE', () => {
      it('delete response with 200 status and ', async () => {
        const favoriteMovie2 = 
          {
            name: 'Harry Potter 2',
            vote_average: 8,
            first_air_date: '09/01/2000',
            overview: 'A random Day',
            poster_path: 'abc.jpg'};

        let result = await request(server)
          .post('/Favorite/Add')
          .set("Cookie", [...header["set-cookie"]])
          .send(favoriteMovie2)
          .expect(200)
        const id = result.body._id
        return request(server)
          .delete(`/Favorite/${id}`)
          .set("Cookie", [...header["set-cookie"]])
          .expect(200);
      })
    })
  })
  describe('/TVshow', () => {
    describe('POST', () => {
      const sampleBody = {genre: 'action', runtime: 40, rating: 6, origin: 'US'};

      it('responds with status 200 for good request', () => {
        return request(server)
          .post('/TVshow/')
          .send(sampleBody)
          .expect(200);
      })
      xit('responds with error for flawed body', async () => {
        const badBody = {genre: 3, runtime: 'fish', rating: [], origin: 45};
        return request(server)
          .post('/TVshow')
          .send(badBody)
          .expect(400)
      })
      it('responds with shows for good request', () => {
        return request(server)
          .post('/TVshow/')
          .send(sampleBody)
          .expect(200)
          .then(result => expect(result.body.length).not.toEqual(0));
      })
    })
  })
})