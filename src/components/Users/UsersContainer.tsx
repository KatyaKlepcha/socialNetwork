import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    follow,
    setCurrentPage, setTotalUsersCount,
    setUsers, toggleFollowingProgress,
    toggleIsFetching,
    unfollow,
    UserType
} from '../../redux/users-reducer';

import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";


type MapStatePropsType = {
    users: Array<UserType>//в видео было InitialStateType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void


}

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)//это и есть массив наших пользователей
            this.props.setTotalUsersCount(data.totalCount)
        })//все, что мы можем отправить на сервак
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {//затем выполни вот этот callback
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)//это и есть массив наших пользователей
            })//все, что мы можем отправить на сервак
    }


    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users {...this.props} onPageChanged={this.onPageChanged}//totalUsersCount={this.props.totalUsersCount}
                //pageSize={this.props.pageSize}
                // currentPage={this.props.currentPage}
                // onPageChanged={this.onPageChanged}//не в пропсах сидит,а явл методом нашей конт компон
                // users={this.props.users}
                // follow={this.props.follow}
                //unfollow={this.props.unfollow}
                //toggleFollowingProgress={this.props.toggleFollowingProgress}
            />
        </>
    }
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType;

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}
//
// let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
//     return {
//         follow: (userId: number) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unFollowAC(userId))
//         },
//         setUsers: (users: Array<UserType>) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber: number) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount: number) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         },
//     }
// }

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingProgress
})(UsersContainer)