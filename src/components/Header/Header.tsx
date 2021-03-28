import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Header.module.css'
import {HeaderContainerType, } from "./HeaderContainer";

const Header = (props: HeaderContainerType) => {
    return (
        <header className={s.header}><img
            src='https://avatars.mds.yandex.net/get-zen-logos/246004/pub_5a4a6b5d8309056de5514434_5a5a26fe5a104f80ac72c2ed/xxh'/>
            <div className={s.loginBlock}>
                {props.isAuth ? props.login :
                    <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>)
}
export default Header