import {profileAPI, usersAPI} from "../api/api";

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
    instagram: "instagram.com/sds",
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
    userId: string
    photos: PhotosType
    isAuth: boolean
}

let initialState = {//однораз объект в случае, если state сюда не придет, будешь этим initialState
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'It is my first post', likesCount: 20}
    ] as Array<PostsType>,
    profile: {} as ProfileType,
    status: ''
}

type InitialStateType = typeof initialState

export type ProfileActionsTypes = ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>


export const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'//используем эти константы,для того, чтобы не использовать строки
const SET_STATUS = 'SET_STATUS'//используем эти константы,для того, чтобы не использовать строки

const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsTypes): InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: 5,
                message: action.newPostText,//до конца не смог проанализир, что есть у этого объекта из-за ReturnType
                // message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
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

export const addPostActionCreator = (newPostText: string) => ({type: ADD_POST, newPostText}) as const//объект как константа
export const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile}) as const//объект как константа
export const setStatus = (status: string) => ({type: SET_STATUS, status}) as const//объект как константа
export const getUserProfile = (userId: string) => (dispatch: any) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    })
}
export const getStatus = (userId: string) => (dispatch: any) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    })
}

export const updateStatus = (status: string) => (dispatch: any) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    })
}
export default profileReducer