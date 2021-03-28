import Profile from "../Profile";
import React from 'react'
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../../redux/profile-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    userId: string
}

export type ProfileContainerType = MapStatePropsType & MapDispatchPropsType;
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

export type MapStatePropsType = {
    profile: ProfileType
}

type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileType) => void,
}

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = '2';
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)//когда сервак даст ответ,
            .then(response => {//затем выполни вот этот callback
                this.props.setUserProfile(response.data)//это и есть массив наших пользователей
            })//все, что мы можем отправить на сервак
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>)
    }
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent)