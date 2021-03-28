import React from 'react'
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserData} from "../../redux/auth-reducer";

type MapStatePropsType = {
    isAuth:boolean
    login: string
}

type MapDispatchPropsType = {
    setAuthUserData: (id: number, email: string, login: string) => void
}

export type HeaderContainerType = MapStatePropsType & MapDispatchPropsType;
// export type HeaderPropsType = RouteComponentProps<PathParamsType> & HeaderContainerType

class HeaderContainer extends React.Component <HeaderContainerType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })//когда сервак даст ответ,
            .then(response => {//затем выполни вот этот callback
                if (response.data.resultCode === 0) {
                    let {id,email,login} = response.data.data
                    this.props.setAuthUserData(id,email,login)
                }
            })
    }

    render() {
        return (
            <Header {...this.props} isAuth={this.props.isAuth} login={this.props.login}/>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType=> ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})


export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);