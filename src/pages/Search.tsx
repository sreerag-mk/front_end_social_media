import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../api/axios'
import Data from '../components/Data'
import searchStyle from '../components/search.module.css'

const Search = () => {
    const { state } = useLocation();
    const [user, setUser] = useState([])
    const [userFind, setUserFind] = useState([])

    async function gettingData() {
        const sendType = {
            user_name: state
        }
        const { data } = await axios.get(process.env.REACT_APP_SEARCH, {
            params: sendType
        })
        const userDetail = data.message
        const userDetailFound = data.success
        setUser(userDetail)
        setUserFind(userDetailFound)
    }
    useEffect(() => {
        gettingData();
    }, [state])
    console.log('the search user is ')
    console.log(user)
    console.log(userFind)
    return (
        <div className={searchStyle.main}>
            {userFind ?
                user.map((users: { id: any; name?: string; profilePicture?: string }) => (
                    <Data key={users.id} group={users} />
                ))
                :
                <h1>{user}</h1>
            }
        </div>
    )
}

export default Search