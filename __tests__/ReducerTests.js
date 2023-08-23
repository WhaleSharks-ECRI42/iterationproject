const reducer = require('../client/slices/showSlice.js');
const { createAction } = require("@reduxjs/toolkit");

describe('Testing showSlice reducer functionality', () => {
  let state;
  
  beforeEach(()=> {
    state = {
      shows: [],
      loading: false,
      error: null,
      showAddButton: true,
      showDeleteButton: false
    }
  })

  it('returns the default state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual(state);
  });

  describe('testing searchTv', () => {
    //'shows/searchTV'
    it('sets loading to true when pending is passed', () => {
      const createTestAction = createAction('shows/searchTV/pending');
      const testAction = createTestAction();
      //testAction probably is {pending: 'shows/searchTV/pending}
      //let result = pass something to the reducer 
      let resultState = reducer(state, testAction);
      expect(resultState.loading).toEqual(true);
    });
  
    it('sets shows to result of db call when fulfilled', () => {
      const createTestAction = createAction('shows/searchTV/fulfilled');
      const testAction = createTestAction([{name: 'first_show'}, {name: 'show_two'}]);
      let resultState = reducer(state, testAction);
      expect(resultState.shows).toEqual([{name: 'first_show'}, {name: 'show_two'}]);
    })
  
    it('sets loading to false and gives an error when rejected', () => {
      const createTestAction = createAction('shows/searchTV/rejected');
      const testAction = createTestAction({error: {message: 'error'}});
      let resultState = reducer(state, testAction);
      expect(resultState.error).toEqual('error');
    })
  })

  describe('testing addFavorite', () => {
    //'shows/addFavorite'
    it('sets loading to true when pending is passed', () => {
    const createTestAction = createAction('shows/addFavorite/pending');
    const testAction = createTestAction();
    let resultState = reducer(state, testAction);
    expect(resultState.pending).toEqual(true);
    });
  
    it('sets loading to false when fulfilled', () => {
      const createTestAction = createAction('shows/addFavorite/fulfilled');
      console.log('createTestAction: ', createTestAction);
      const testAction = createTestAction();
      //console.log('testAction', testAction);
      // testAction { type: 'shows/addFavorite/fulfilled', payload: undefined }
      state.loading = true;
      let resultState = reducer(state, testAction);
      expect(resultState.loading).toEqual(false);
    });
  
    it('sets loading to false and gives an error when rejected', () => {
      
    })
  })

  describe('testing displaysFavorites', () => {
    // 'shows/displaysFavorites'
    it('sets loading to true when pending is passed', () => {
      const createTestAction = createAction('shows/displaysFavorites/pending');
      const testAction = createTestAction({error: {message: 'error'}});
      let resultState = reducer(state, testAction);
      expect(resultState.loading).toEqual(true);
    });
  
    it('sets loading to false when fulfilled and sets shows to result of fetch request, showAdd button to false, and showdeletebutton to true', () => {
      const createTestAction = createAction('shows/displaysFavorites/fulfilled');
      state.loading = true;
      const testAction = createTestAction({
        _id: 'unique-id-1',
        name: 'John',
        vote_average: 10,
        first_air_date: "2023-08-22",
        overview: "A really cool movie",
        poster_path: "/google.jpg"});
        let resultState = reducer(state, testAction);
        expect(resultState.loading).toEqual(false);
        expect(resultState.showAddButton).toEqual(false);
        expect(resultState.showDeleteButton).toEqual(true);
        expect(resultState.shows).toEqual({
          _id: 'unique-id-1',
          name: 'John',
          vote_average: 10,
          first_air_date: "2023-08-22",
          overview: "A really cool movie",
          poster_path: "/google.jpg"});
    })
  
    it('sets loading to false and gives an error when rejected', () => {
      const createTestAction = createAction('shows/displaysFavorites/rejected');
      const testAction = createTestAction({error: {message: 'error'}});
      state.loading = true;
      let resultState = reducer(state, testAction);
      expect(resultState.loading).toEqual(false);
      expect(resultState.error).toEqual('error');
    })
  })

  describe('testing deleteFavorite', () => {
    it('sets loading to true when pending action is called', () => {
      const createTestAction = createAction('shows/deleteFavorite/pending');
      const testAction = createAction();
      let resultState = reducer(state, Action);
      expect(resultState.loading).toEqual(true);
    });
  
    it('sets loading to false when fulfilled and sets shows to result of fetch request', () => {
      const createTestAction = createAction('shows/deleteFavorite/fulfilled')
      const testAction = createTestAction([1, 2, 3]);
      state.loading = true;
      let resultState = reducer(state, testAction);
      expect(resultState.loading).toEqual(false);
      // sets shows to result of fetch request
      expect(resultState.shows).toEqual([1, 2, 3]);
    });
  
    it('sets loading to false and gives an error when rejected', () => {
      const createTestAction = createAction('shows/deleteFavorite/rejected');
      const testAction = createTestAction({error: {message: 'error'}});
      state.loading = true;
      let resultState = reducer(state, testAction);
      expect(resultState.loading).toEqual(false);
      expect(resultState.error).toEqual('error');
    });
  });

  

  

  it('does a thing we want', () => {
    
  })
});