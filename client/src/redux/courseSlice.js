import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3000/api/course";

//async thunk
export const fetchPublishedCourse = createAsyncThunk(
  "course/fetchPublished",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/published`, {
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message);
      }
      return data.courses;
    } catch (error) {
      return rejectWithValue("Failed to fetch courses");
    }
  },
);

export const fetchInstructorCourses = createAsyncThunk(
  "course/fetchInstructor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        credentials: "include",
      });

      const data = await response.json();
      console.log("dataInInstructorThunk", data.courses);

      if (!response.ok) {
        return rejectWithValue(data.message);
      }
      return data.courses;
    } catch (error) {
      return rejectWithValue("Failed to fetch instructor courses");
    }
  },
);

export const fetchCourseById = createAsyncThunk(
  "course/fetchById",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${courseId}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message);
      }
      return data.course;
    } catch (error) {
      return rejectWithValue("Failed to fetch course");
    }
  },
);

//Slice
const courseSlice = createSlice({
  name: "course",
  initialState: {
    publishedCourses: [],
    instructorCourses: [],
    currentCourse: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    clearError: (state) => {
      state.error = null;
    },

    removeCourse: (state, action) => {
      state.instructorCourses = state.instructorCourses.filter(
        (c) => c._id !== action.payload,
      );
    },

    toggleCoursePublish: (state, action) => {
      const course = state.instructorCourses.find(
        (c) => c._id === action.payload,
      );
      if (course) {
        course.isPublished = !course.isPublished;
      }
    },
  },

  extraReducers: (builder) => {
    //fetchPublishedCourse
    builder
      .addCase(fetchPublishedCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublishedCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.publishedCourses = action.payload;
      })
      .addCase(fetchPublishedCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchInstructorCourses.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.instructorCourses = action.payload;
      })
      .addCase(fetchInstructorCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchCourseById.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearCurrentCourse,
  clearError,
  removeCourse,
  toggleCoursePublish,
} = courseSlice.actions;

export default courseSlice.reducer;
