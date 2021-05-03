import React from 'react'
import {AppStateType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


const mapStateToProps = (state: AppStateType) => {//смысл этой фции: замапить state на пропсы(превратить часть state в пропсы)
    return {
        dialogsPage:state.dialogsPage,//этот объект настраивает данные. кот мы возьмем из state
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

//
// let AuthRedirectComponent = withAuthRedirect(Dialogs)
//
// const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);//первым вызовом функции connect мы настраиваем нашу контейнерную компоненту


export default compose<React.ComponentType>(
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect
)(Dialogs)