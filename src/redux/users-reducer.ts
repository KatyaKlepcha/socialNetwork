export type UserType = {
    id: number
    photos: PhotosType
    followed: boolean
    name: string
    status: string
    location: LocationType
}

type PhotosType = {
    small: string
    large: string
}

type LocationType = {
    city: string
    country: string
}

export type UsersActionsTypes =
    ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_USERS_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState: InitialStateType = {//однораз объект в случае, если state сюда не придет, будешь этим initialState
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,//изначально ничего не получаем
    followingInProgress: []
};

type followingInProgressType = {

}
export type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}


const usersReducer = (state: InitialStateType = initialState, action: UsersActionsTypes): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                // users: [...state.users]
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                // users: [...state.users]
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }

        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id=>id !== action.userId)
        }
        }

        default:
            return state;
    }
}

export const follow = (userId: number) => ({type: FOLLOW, userId}) as const//объект как константа
export const unfollow = (userId: number) => ({type: UNFOLLOW, userId}) as const//воспринимай этот бъект, как константу
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users}) as const//воспринимай этот бъект, как константу
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const//воспринимай этот бъект, как константу
export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
}) as const//воспринимай этот бъект, как константу
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching}) as const
export const toggleFollowingProgress = (isFetching: boolean,userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
}) as const


export default usersReducer