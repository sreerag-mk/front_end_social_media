/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../api/axios';
import Data from '../components/Data';
import searchStyle from '../components/search.module.css';

function Search() {
    const { state } = useLocation();
    const [user, setUser] = useState([]);
    const [userFind, setUserFind] = useState([]);

    const searchURL: string = process.env.REACT_APP_SEARCH ?? '';


    useEffect(() => {
        async function gettingData() {
            const sendType = {
                user_name: state,
            };
            const { data } = await axios.get(searchURL, {
                params: sendType,
            });
            const userDetail = data.message;
            const userDetailFound = data.success;
            setUser(userDetail);
            setUserFind(userDetailFound);
        }
        gettingData();
    }, [searchURL, state]);
    return (
        <div className={searchStyle.main}>
            {userFind ? (
                user.map(
                    (users: { id: number; name: string; profilePicture: string }) => (
                        <Data key={users.id} group={users} />
                    )
                )
            ) : (
                <h1>{user}</h1>
            )}
        </div>
    );
}

export default Search;
