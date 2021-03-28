import React from 'react'
import {AppStateType, StoreType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";



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
type DialogsPropsType = {
    store: StoreType
    // state: AppStateType
    // dispatch: (action: ActionsTypes) => void

}
// const DialogsContainer = () => {
//
//     // let newMassageElement = React.createRef<HTMLTextAreaElement>()
//
//     return <StoreContext.Consumer>
//         {
//             (store: StoreType) => {
//                 let onSendMessageClick = () => {
//                     store.dispatch(sendMessageCreator())
//                 }
//
//                 let onNewMessageChange = (body: string) => {
//                     store.dispatch(updateNewMessageBodyCreator(body))//диспатчим то, что вернул нам action creator
//                 }
//                 return <Dialogs updateNewMessageBody={onNewMessageChange}
//                                 sendMessage={onSendMessageClick}
//                                 dialogsPage={store.getState().dialogsPage}/>
//             }
//         }
//     </StoreContext.Consumer>
// }


const mapStateToProps = (state: AppStateType) => {//смысл этой фции: замапить state на пропсы(превратить часть state в пропсы)
    return {
        dialogsPage:state.dialogsPage//этот объект настраивает данные. кот мы возьмем из state
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        updateNewMessageBody: (body: string)=>{
            dispatch(updateNewMessageBodyCreator(body))
        },
        sendMessage:()=>{
            dispatch(sendMessageCreator())
        }

    }//этот объект callback-и, кот мы будем отправлять в презентационн компоненту

}

const SuperDialogsContainer = connect(mapStateToProps,mapDispatchToProps )(Dialogs);//первым вызовом функции connect мы настраиваем нашу контейнерную компоненту


export default SuperDialogsContainer