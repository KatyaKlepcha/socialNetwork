import {authAPI} from "../api/api";

export type AuthActionsTypes =
    ReturnType<typeof setAuthUserData>


const SET_USER_DATA = 'SET_USER_DATA'

const initialState: InitialStateType = {//однораз объект в случае, если state сюда не придет, будешь этим initialState
    id: 0,
    email: '',
    login: '',
    isAuth: false
    //isFetching: false//изначально ничего не получаем
};

export type InitialStateType = {
    id: number
    email: string
    login: string
    isAuth: boolean
    //isFetching: boolean
}


const authReducer = (state: InitialStateType = initialState, action: AuthActionsTypes): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true

            }
        default:
            return state;
    }
}

export const setAuthUserData = (id: number, email: string, login: string) => ({type: SET_USER_DATA, data:{ id,email,login}}) as const//объект как константа
export const getAuthUserData = ()=>(dispatch: any)=>{
    authAPI.me().then(response => {//затем выполни вот этот callback
        if (response.data.resultCode === 0) {
            let {id,email,login} = response.data.data
            dispatch(setAuthUserData(id,email,login))
        }
    })
}

export default authReducer