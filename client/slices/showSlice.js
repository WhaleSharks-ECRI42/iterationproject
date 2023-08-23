// importing built in createSlice from toolkit
// createSlice will reduce the amount of boilerplate code
// allows us to have action types, action creators, and reducers all in one
// action types will be something the toolkit does under the hood
//import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
const {createAsyncThunk, createSlice} = require('@reduxjs/toolkit');
/* export */const searchTV = createAsyncThunk(
  'shows/searchTV',
  async (searchCriteria, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/TVShow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchCriteria),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch.');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* export */const addFavorite = createAsyncThunk(
  'shows/addFavorite',
  async (favoriteObj, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/Favorite/Add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favoriteObj),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch.');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* export */const displaysFavorites = createAsyncThunk(
  'shows/displaysFavorites',
  async () => {
    try {
      const response = await fetch('http://localhost:3000/Favorite', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch.');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* export */const deleteFavorite = createAsyncThunk(
  'deleteFavorite',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/Favorite/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch.');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const showSlice = createSlice({
  name: 'shows',
  //will be empty - populated for testing purposes
  //initial state on app startup
  initialState: {
    shows: [],
    loading: false,
    error: null,
    showAddButton: true,
    showDeleteButton: false
  },
  reducers: {},
  // extraReducers is a separate object for async reducers (builder is boilerplate, then we have addCases instead of switch cases)
  extraReducers: (builder) => {
    builder
      .addCase(searchTV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTV.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action)
        console.log(action.payload)
        state.shows = action.payload; // Assuming the backend returns an array of shows
        state.showAddButton = true,
        state.showDeleteButton = false
      })
      .addCase(searchTV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.message;
      })
      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.loading = false;
        console.log('hi')// Assuming the backend returns an array of shows
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(displaysFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(displaysFavorites.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.shows = action.payload,// Assuming the backend returns an array of shows
        state.showAddButton = false,
        state.showDeleteButton = true
      })
      .addCase(displaysFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.shows = action.payload// Assuming the backend returns an array of shows
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

//export default showSlice.reducer;

module.exports = showSlice.reducer;

//this is a comment