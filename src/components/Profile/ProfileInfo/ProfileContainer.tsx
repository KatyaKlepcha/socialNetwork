import Profile from "../Profile";
import React from 'react'
import {connect} from "react-redux";
import {ProfileType, getUserProfile} from "../../../redux/profile-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";


type PathParamsType = {
    userId: string
}

export type ProfileContainerType = MapStatePropsType & MapDispatchPropsType;
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

export type MapStatePropsType = {
    profile: ProfileType,
}

type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void,
}

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = '2';
        }
        this.props.getUserProfile(userId)
    }

    render() {

        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>)
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)