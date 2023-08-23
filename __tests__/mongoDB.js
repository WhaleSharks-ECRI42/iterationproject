const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://jas0430:Wr5kilCG1o2EQmSe@wpt-42.yjrdn5e.mongodb.net/?retryWrites=true&w=majority'
const Favorite = require('../server/models/favoriteModel.js')


// const testSchema = new Schema ({
//   name: {type: String, required: true},
//   vote_average: {type: Number, required: true},
//   first_air_date: {type: String, required: true},
//   overview: {type: String, required: true},
//   poster_path: {type: String, required: true}
// })

// const Test = mongoose.model('Test', testSchema);

// test to insert movies into our mongoDB favorites
describe('insert', () => {
  let connection;

  beforeAll(async () => {
    connection = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should insert a favorite document into Favorites collection', async () => {
    const mockFavorite = {
      name: 'John',
      vote_average: 10,
      first_air_date: "2023-08-22",
      overview: "A really cool movie",
      poster_path: "/google.jpg"
    };
    try {
      const insertedFavorite = await Favorite.create(mockFavorite);
      const foundFavorite = await Favorite.findOneAndDelete({_id: insertedFavorite.id})
      expect(foundFavorite).toEqual(insertedFavorite);
    } catch (error) {
      console.log(error);
    }
  });
  it('should delete a favorite document in Favorites collection', async () => {
    const mockFavorite = {
      name: 'John',
      vote_average: 10,
      first_air_date: "2023-08-22",
      overview: "A really cool movie",
      poster_path: "/google.jpg"
    };
    try {
      const originalDocumentCount = await Favorite.countDocuments();
      const insertedFavorite = await Favorite.create(mockFavorite);
      const deletedFavorite = await Favorite.deleteOne({_id: insertedFavorite.id});
      const newDocumentCount = await Favorite.countDocuments(); 
      expect(deleteFavorite).toEqual(null); 
      expect(newDocumentCount).toEqual(originalDocumentCount); 
    } catch (error) {
      console.log(error); 
    }
  });
  it ('should NOT find a favorite document in Favorites collection upon wrong query', async () => {
    try {
      
    } catch (error) {
      console.log(error); 
    }
  });
});



