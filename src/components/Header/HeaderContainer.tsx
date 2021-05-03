import React from 'react'
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthUserData} from "../../redux/auth-reducer";


type MapStatePropsType = {
    isAuth:boolean
    login: string
}

type MapDispatchPropsType = {
    getAuthUserData: () => void
}

export type HeaderContainerType = MapStatePropsType & MapDispatchPropsType;
// export type HeaderPropsType = RouteComponentProps<PathParamsType> & HeaderContainerType

class HeaderContainer extends React.Component <HeaderContainerType> {
    componentDidMount() {
       this.props.getAuthUserData()
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


export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);