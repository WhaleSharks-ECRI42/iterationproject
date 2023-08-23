const request = require('supertest');

const server = 'http://localhost:3000';
const fs = require('fs');
const path = require('path');
const testJsonFile = path.join(__dirname, '../server/db/favorites.test.json');

describe('Route integration', () => {
  describe('/Favorite', () => {
    describe('GET', () =>{
      it('response with 200 status and application.json', () => {
        return request(server)
          .get('/Favorite')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });






  describe('/Favorite/Add', () => {  
    describe('POST', () => {
      it('response with 200 status and application.json content type', () =>{
        const favoriteMovie = [
          {
            name: 'Harry Potter',
            rating: 8,
            first_air_date: '09/01/2000',
            overview: 'A random Day',
            posterpath: 'abc.jpg'}];

        return request(server)
          .post('/Favorite/Add')
          .send(favoriteMovie)
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
      
      it('responds with the updated favoriteList', () => {
        const newFavoriteList = [
          {name: 'Harry Potter',
          rating: 8,
          first_air_date: '09/01/2000',
          overview: 'A random Day',
          posterpath: 'abc.jpg'
        },
        {name: 'Hocus Pocus',
          rating: 9.5,
          first_air_date: '10/15/2003',
          overview: 'Witchy Witches',
          posterpath: 'witches.jpg'}
        ];
        return request(server)
          .post('Favorite/Add')
          .send(newFavoriteList)
          .then((response) => {
            expect(response.body).toEqual(newFavoriteList);
          });
      })
  })
})
  describe('/Favorite/:id', () => {
    describe('DELETE', () => {
      it('delete response with 200 status and application.json content type', () => {
        return request(server)
          .delete('/Favorite/:id')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      })
    })
  })
})