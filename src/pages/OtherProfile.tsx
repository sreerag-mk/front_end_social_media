/* eslint-disable prettier/prettier */
import { useLocation } from 'react-router-dom';
import OtherUserProfileHeader from '../components/OtherUserProfileHeader';
import OtherUserProfileFeed from '../components/OtherUserProfileFeed';
import style from '../components/OtherProfile.module.css';

function Profile() {
    const { state } = useLocation();

    return (
        <div className={style.page}>
            <OtherUserProfileHeader userId={state} />
            <div className={style.center} />
            <OtherUserProfileFeed userId={state} />

        </div >
    );
}

export default Profile;
