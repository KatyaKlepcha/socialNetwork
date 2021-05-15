import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {TextArea} from "../../common/FormsControls/FormsControls";



type FormPostType = {
    newPostText: string
}
const maxLength10 =  maxLengthCreator(10)

const AddPostForm: React.FC<InjectedFormProps<FormPostType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea} name="newPostText" placeholder={'Post message'} validate={[required, maxLength10]}/>

            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}


export default reduxForm<FormPostType> ({form: 'profile-add-post'})(AddPostForm)