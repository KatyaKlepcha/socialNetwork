import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk'

export type StoreType = typeof store

let rootReducer = combineReducers({//создаем объект, у кот есть св-во profileReducer, значением этого св-ва будет явл reducer(ф-ция кот мы определили)
    profilePage: profileReducer,//по сути каждое св-во явл методом
    dialogsPage: dialogsReducer,//этот объект нужно воспринимать, как наш state
    usersPage: usersReducer,
    auth: authReducer
    // sidebar: sidebarReducer
})
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));//автоматически createStore создает внутри себя state, у кот есть 3 св-ва(profilePage,dialogsPage,sidebar)
export type AppStateType = ReturnType<typeof rootReducer>//дай мне возвращаемый тип


export default store