
type PostsType = {
    id: number
    message: string
    likesCount: number
}

type ContactsType = {
    facebook: "facebook.com",
    website: null,
    vk: "vk.com/dimych",
    twitter: "https://twitter.com/@sdf",
    instagram: "instagra.com/sds",
    youtube: null,
    github: "github.com",
    mainLink: null
}

type PhotosType = {
    small: string
    large: string
}

export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean,
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}

let initialState = {//однораз объект в случае, если state сюда не придет, будешь этим initialState
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'It is my first post', likesCount: 20}
    ] as Array <PostsType>,
    newPostText: '',
    profile: {} as ProfileType
}

type InitialStateType = typeof initialState

export type ProfileActionsTypes = ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updateNewPostTextActionCreator>
    | ReturnType<typeof setUserProfile>


export const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'//используем эти константы,для того, чтобы не использовать строки
const SET_USER_PROFILE = 'SET_USER_PROFILE'//используем эти константы,для того, чтобы не использовать строки

const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsTypes):InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: 5,
                message: state.newPostText,//до конца не смог проанализир, что есть у этого объекта из-за ReturnType
                // message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }


        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST}) as const//объект как константа
export const updateNewPostTextActionCreator = (text: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
}) as const//воспринимай этот бъект, как константу
export const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile}) as const//объект как константа

export default profileReducer