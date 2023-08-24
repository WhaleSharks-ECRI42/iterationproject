// importing built in createSlice from toolkit
const axios = require('axios');
// createSlice will reduce the amount of boilerplate code
// allows us to have action types, action creators, and reducers all in one
// action types will be something the toolkit does under the hood
//import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
/* export */ const searchTV = createAsyncThunk(
  "shows/searchTV",
  async (searchCriteria, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/TVShow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: 'include'
        },
        body: JSON.stringify(searchCriteria),
      });
      

      if (!response.ok) {
        throw new Error("Failed to fetch.");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addFavorite = createAsyncThunk(
  "shows/addFavorite",
  async (favoriteObj, { rejectWithValue }) => {
    console.log('in async funk w/in searchTV');
    try {
      // const response = await fetch("http://localhost:3000/Favorite/Add", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     credentials: 'include'
      //   },
      //   body: JSON.stringify(favoriteObj),
      // });
      const response = await axios.post('http://localhost:3000/Favorite/Add', favoriteObj, {
        headers: {
          "Content-Type": "application/json"
          },
          withCredentials: true
        });

      if (!response.ok) {
        throw new Error("Failed to fetch.");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* export */ const displaysFavorites = createAsyncThunk(
  "shows/displaysFavorites",
  async () => {
    try {
      // const response = await fetch("http://localhost:3000/Favorite", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     credentials: 'include'
      //   },
      // });
      const response = await axios.get('http://localhost:3000/Favorite', {
        headers: {
          "Content-Type": "application/json"
          },
          withCredentials: true
        });
      console.log('response', response);
      return await response.data;
    } catch (error) {
      console.log('hit catch block of display favorites')
      return rejectWithValue(error.message);
    }
  }
);

/* export */ const deleteFavorite = createAsyncThunk(
  "deleteFavorite",
  async (id, { rejectWithValue }) => {
    try {
      // const response = await fetch(`http://localhost:3000/Favorite/${id}`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      const response = await axios.delete(`http://localhost:3000/Favorite/${id}`, {
        headers: {
          "Content-Type": "application/json"
          },
          withCredentials: true
        });
      
        // reverted this back to original so we don't forget, but i think we need this to be whats shown on line 82
      return await response.json();
    } catch (error) {
      console.log('catch block in deleteFavorite');
      return rejectWithValue(error);
    }
  }
);

const showSlice = createSlice({
  name: "shows",
  //will be empty - populated for testing purposes
  //initial state on app startup
  initialState: {
    shows: [],
    loading: false,
    error: null,
    showAddButton: true,
    showDeleteButton: false,
    userInfo: { username: "", password: "" },
  },
  reducers: {
    updateUsername(state, action) {
      //console.log("updating username");
      state.userInfo.username = action.payload;
    },
    updatePassword(state, action) {
      //console.log("updating password");
      state.userInfo.password = action.payload;
    },
    doNothing(state, action) {
      state = state;
    },
  },
  // extraReducers is a separate object for async reducers (builder is boilerplate, then we have addCases instead of switch cases)
  extraReducers: (builder) => {
    builder
      .addCase(searchTV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTV.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
        console.log(action.payload);
        state.shows = action.payload; // Assuming the backend returns an array of shows
        (state.showAddButton = true), (state.showDeleteButton = false);
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
        console.log("hi"); // Assuming the backend returns an array of shows
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(displaysFavorites.pending, (state) => {
        console.log('waiting for display favorites')
        state.loading = true;
        state.error = null;
      })
      .addCase(displaysFavorites.fulfilled, (state, action) => {
        state.loading = false;
        console.log('action.payload', action.payload);
        (state.shows = action.payload), // Assuming the backend returns an array of shows
          (state.showAddButton = false),
          (state.showDeleteButton = true);
      })
      .addCase(displaysFavorites.rejected, (state, action) => {
        console.log('no favorites for you')
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.shows = action.payload; // Assuming the backend returns an array of shows
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

//export default showSlice.reducer;

const { updatePassword, updateUsername } = showSlice.actions;
module.exports = {
  reducer: showSlice.reducer,
  updatePassword,
  updateUsername,
  searchTV,
  addFavorite,
  displaysFavorites,
  deleteFavorite,
};

//this is a comment
