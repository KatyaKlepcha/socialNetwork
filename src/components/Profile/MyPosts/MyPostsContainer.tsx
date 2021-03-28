import React from 'react';
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {Dispatch} from "redux";



export type PostsType = {
    id: number
    message: string
    likesCount: number
}
// const MyPostsContainer = (props: MyPostsPropsType) => {
//
//     // const postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)
//     // const newPostElement = React.createRef<HTMLTextAreaElement>();
//
//
//     return <StoreContext.Consumer>
//         {//мы нашу компоненту обернули ф-цией, кот принимает store и обернули тегом StoreContext.Consumer
//             (store) => {
//                 let state = store.getState();
//                 const addPost = () => {
//                     store.dispatch(addPostActionCreator());//addPost вызывается от имени  props-ов
//                 }
//                 const onPostChange = (text: string) => {
//                     let action = updateNewPostTextActionCreator(text)
//                     store.dispatch(action)
//                 }
//
//                 return <MyPosts updateNewPostText={onPostChange}
//                                 addPost={addPost}
//                                 posts={state.profilePage.posts}
//                                 newPostText={state.profilePage.newPostText}/>
//             }
//         }
//     </ StoreContext.Consumer>
// }

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateNewPostText: (text: string) => {
            let action = updateNewPostTextActionCreator(text);
         dispatch(action);
        },
        addPost: () => {
            dispatch(addPostActionCreator())
        }
    }
}


const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostContainer;