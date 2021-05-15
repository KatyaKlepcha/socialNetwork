import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";

type FormMessageType = {
    newMessageBody: string
}

const maxLength50 = maxLengthCreator(50)
const AddMessageForm: React.FC<InjectedFormProps<FormMessageType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea}
                       name="newMessageBody"
                       validate = {[required, maxLength50]}
                       placeholder="Enter your message"/>
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>)
}

export default reduxForm<FormMessageType>({form: 'dialog-add-message-form'})(AddMessageForm)