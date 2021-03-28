import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";

type ProfileInfoPropsType = {
    profile: ProfileType
}
const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile){
        return <Preloader/>
    }
    return (
        <div>
            <h1>{props.profile.fullName}</h1>
            <div>
                <img src='https://www.selltoearn.com/2018/norway-pier-dock-landscape120419.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                <img src = {props.profile.photos?.large}/>
                ava+description
            </div>
        </div>
    )
}

export default ProfileInfo