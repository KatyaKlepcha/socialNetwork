import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Redirect } from 'react-router-dom';

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
    updateNewMessageBody: (body: string) => void
    // state: AppStateType
    // dispatch: (action: ActionsTypes) => void
    dialogsPage: DialogsPageType
    sendMessage: () => void
    isAuth: boolean
}
const Dialogs = (props: DialogsPropsType) => {
    // let state = props.dialogsPage

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    // придет объект message
    let messagesElement = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>)
    let newMessageBody = props.dialogsPage.newMessageBody;

    // let newMassageElement = React.createRef<HTMLTextAreaElement>()

    let onSendMessageClick = () => {
        props.sendMessage()
    }

    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value;
        props.updateNewMessageBody(body)
        //props.dispatch(updateNewMessageBodyCreator(body))
    }

    if (!props.isAuth) return <Redirect to={'/login'}/>


        return (
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    <div>{messagesElement}</div>
                    <div>
                        <div>
                        <textarea value={newMessageBody}
                                  onChange={onNewMessageChange}//когда мы что-то вводим, срабатывает событие onChange
                                  placeholder='Enter your message'
                        />
                        </div>
                        <div>
                            <button onClick={onSendMessageClick}>Send message</button>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Dialogs