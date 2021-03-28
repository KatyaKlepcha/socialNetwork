import s from './Post.module.css'

type PostPropsType = {
    message: string
    likesCount: number
}

const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <img src='https://i09.fotocdn.net/s110/003e603e9e1b6f84/user_l/2438638284.jpg'/>
            {props.message}
            <div>
                <span>likes</span> {props.likesCount}
            </div>
        </div>
    )
}
export default Post