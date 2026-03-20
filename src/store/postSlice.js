import {createSlice} from "@reduxjs/toolkit";
import { get } from "react-hook-form";

const initialState = {
    posts: [],
    userData: null,
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPost : (state, action) => {
            state.posts = action.payload;
            
        },

        getPosts: (state) => {
            return state.posts;
        }

    }
});
export const { setPost, getPosts } = postSlice.actions;

export default postSlice.reducer;