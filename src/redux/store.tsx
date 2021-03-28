import profileReducer, {ProfileActionsTypes} from "./profile-reducer";
import dialogsReducer, {DialogsActionsTypes} from "./dialogs-reducer";
import {UsersActionsTypes} from "./users-reducer";


type DialogsType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}
type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
}
type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}


type StoreType = {
    _state: StateType
    subscribe: (observer: () => void) => void
    _callSubscriber: () => void
    getState: () => StateType
    dispatch: (action: ActionsTypes) => void
}

// type ChangeNewTextActionType = ReturnType<typeof updateNewPostTextActionCreator>
type ActionsTypes = ProfileActionsTypes | DialogsActionsTypes | UsersActionsTypes


let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 15},
                {id: 2, message: 'It is my first post', likesCount: 20}
            ],
            newPostText: ''
        },

        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Gragina'},
                {id: 2, name: 'Jenya'},
                {id: 3, name: 'Nastya'},
                {id: 4, name: 'Vika'},
                {id: 5, name: 'Alyona'},
                {id: 6, name: 'Denis'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are you'},
                {id: 3, message: 'Can we meet?'},
                {id: 4, message: 'What are you doing'}
            ],
            newMessageBody: ''
        },
        // sidebar: {
        //     friends: [
        //         {name: 'Nastya'},
        //         {name: 'Vika'},
        //         {name: 'Gragina'}
        //     ]
        // }
    },//св-во
    _callSubscriber() {//уведомляет подписчика извне, какого-то observer-а(наблюдателя)//простенькая реализация паттерна observer-subscriber
        console.log('state changed')
    },//  метод

    getState() {
        return this._state;//this внутри метода означ, от чьего имени вызван этот объект
    },//не относятся к методам, кот state наш меняют
    subscribe(observer) {
        this._callSubscriber = observer;
    },//не относятся к методам, кот state наш меняют


    dispatch(action) {//{type: 'ADD-POST'} }//чтобы не хотели поменять внутри state исп-те этот метод
        //this._state.profilePage = profileReducer(this._state.profilePage, action)
       // this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        // this._state.sidebar = profileReducer(this._state.sidebar, action)
       // this._callSubscriber()

    }
}


export default store