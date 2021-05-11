import React from 'react';
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {addPostActionCreator} from "../../../redux/profile-reducer";
import {Dispatch} from "redux";



export type PostsType = {
    id: number
    message: string
    likesCount: number
}


const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
        // newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText))
        }
    }
}


const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostContainer;