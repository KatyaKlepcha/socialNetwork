import {ProfileActionsTypes} from "./profile-reducer";
import {UsersActionsTypes} from "./users-reducer";

type ActionsTypes = ProfileActionsTypes | DialogsActionsTypes | UsersActionsTypes
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
let initialState = {//писать :InitialStateType не надо ниже при определении типа мы исходим из этого объекта. Чтобы не было циклич зависимости
    dialogs: [
        {id: 1, name: 'Gragina'},
        {id: 2, name: 'Jenya'},
        {id: 3, name: 'Nastya'},
        {id: 4, name: 'Vika'},
        {id: 5, name: 'Alyona'},
        {id: 6, name: 'Denis'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'Can we meet?'},
        {id: 4, message: 'What are you doing'}
    ] as Array<MessagesType>,//воспринимай это массив как массив типа
    newMessageBody: ''
}

export type DialogsActionsTypes =
    ReturnType<typeof sendMessageCreator> |
    ReturnType<typeof updateNewMessageBodyCreator>


const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY' //создаем тип action-a
const SEND_MESSAGE = 'SEND_MESSAGE' //создаем тип action-a

export type InitialStateType = typeof initialState

const dialogsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType=> {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }

        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 5, message: body}]
            };
        default:
            return state
    }
    return state;
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE}) as const//объект как константа
export const updateNewMessageBodyCreator = (body: string) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: body
}) as const//воспринимай этот  объект, как константу


export default dialogsReducer;