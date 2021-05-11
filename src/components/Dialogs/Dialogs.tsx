import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {reduxForm, Field, InjectedFormProps} from "redux-form";

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
    // updateNewMessageBody: (body: string) => void
    dialogsPage: DialogsPageType
    sendMessage: (newMessageBody: string) => void
    isAuth: boolean
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}
const Dialogs = (props: DialogsPropsType) => {
    debugger
    // let state = props.dialogsPage

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    // придет объект message
    let messagesElement = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>)
    // let newMessageBody = props.dialogsPage.newMessageBody;

    // let newMassageElement = React.createRef<HTMLTextAreaElement>()

    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody)
    }

    // if (!props.isAuth) {<Redirect to={'/login'}/>}


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElement}</div>

            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

type FormMessageType = {
    newMessageBody: string
}

const AddMessageForm: React.FC<InjectedFormProps<FormMessageType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component="textarea" name="newMessageBody" placeholder="Enter your message"/>
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>)
}

const AddMessageFormRedux = reduxForm<FormMessageType>({form: 'dialogAddMessageBody'})(AddMessageForm)
export default Dialogs