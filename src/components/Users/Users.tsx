import React from 'react'
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/photo-155922.gif";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress:Array<number>
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
}

let Users = (props: UsersType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? styles.selectedPage : ""}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}

        </div>

        {
            props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <NavLink to={'/profile/' + u.id}>
                    <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}
                         alt={'user'}/>
                    </NavLink>
                </div>
                <div>
                    {u.followed
                        ? <button disabled={props.followingInProgress.some(id=>id===u.id)} onClick={() => {
                            props.toggleFollowingProgress(true, u.id)
                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                withCredentials: true,
                                headers: {
                                    "API-KEY": "66998eb2-78da-4090-8cd5-d615a3d33aa4"
                                }
                            })
                                .then(response => {//затем выполни вот этот callback
                                    if (response.data.resultCode === 0) {
                                        props.unfollow(u.id)
                                    }
                                    props.toggleFollowingProgress(false, u.id)
                                })

                        }}>Unfollow</button>
                        : <button disabled={props.followingInProgress.some(id=>id===u.id)} onClick={() => {
                            props.toggleFollowingProgress(true, u.id)
                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                withCredentials: true,
                                headers: {
                                    "API-KEY": "66998eb2-78da-4090-8cd5-d615a3d33aa4"
                                }
                            })
                                .then(response => {//затем выполни вот этот callback
                                    if (response.data.resultCode === 0) {
                                        props.follow(u.id)
                                    }
                                    props.toggleFollowingProgress(false, u.id)
                                })


                        }}>Follow</button>}
                </div>
            </span>
                <span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                </span>
            </span>
            </div>)
        }
    </div>
}

export default Users