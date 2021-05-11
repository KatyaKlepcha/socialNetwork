import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


export type PostsType = {
    id: number
    message: string
    likesCount: number
}

type MyPostsPropsType = {
    posts: Array<PostsType>
    addPost: (newPostText:string) => void
}
type AddPostTextType = {
    newPostText: string
}

const MyPosts = (props: MyPostsPropsType) => {


    const postsElements =
        props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    // const newPostElement = React.createRef<HTMLTextAreaElement>();

    // const onAddPost = () => {
    //     props.addPost();
    //     // props.dispatch({type: 'ADD-POST', newPostText: props.newPostText});//addPost вызывается от имени  props-ов
    //     // props.dispatch(addPostActionCreator());//addPost вызывается от имени  props-ов
    // }

    const onAddPostText = (values: AddPostTextType) => {
        props.addPost(values.newPostText);
    }


    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <AddPostFormRedux onSubmit={onAddPostText}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

type FormPostType = {
    newPostText: string
}

const AddNewPostForm: React.FC<InjectedFormProps<FormPostType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component="textarea" name="newPostText"/>

            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm<FormPostType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)
export default MyPosts