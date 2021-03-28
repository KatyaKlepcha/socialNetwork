import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";


export type PostsType = {
    id: number
    message: string
    likesCount: number
}

type MyPostsPropsType = {
    posts: Array<PostsType>
    newPostText: string
    // dispatch: (action: ActionsTypes) => void
    addPost: () => void
    updateNewPostText:(text: string)=> void
}

const MyPosts = (props: MyPostsPropsType) => {


    const postsElements =
        props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>();

    const onAddPost = () => {
        props.addPost();
        // props.dispatch({type: 'ADD-POST', newPostText: props.newPostText});//addPost вызывается от имени  props-ов
        // props.dispatch(addPostActionCreator());//addPost вызывается от имени  props-ов
    }
    const onPostChange = () => {
        if (newPostElement.current) {
            let text = newPostElement.current.value
            props.updateNewPostText(text)
            // let action = {type: 'UPDATE-NEW-POST', newText: text};
            // let action = updateNewPostTextActionCreator(text)
            // props.dispatch(action)
        }
    }


    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}
                              onChange={onPostChange}
                              value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add Post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}
export default MyPosts