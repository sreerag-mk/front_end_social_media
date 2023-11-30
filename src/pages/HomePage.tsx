import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function HomePage() {
    const navigate = useNavigate();
    const user: string | null = localStorage.getItem('userInfo');
    const [newData, setNewData] = useState<string>('')
    let userparse: string | null = null;
    if (user !== null) {
        try {
            userparse = JSON.parse(user)
            const headers = {
                Authorization: `Bearer ${userparse}`
            };
            const profileData = async () => {
                const newUser = await axios.get('/service/profile',
                    { headers }
                )
                setNewData(newUser.data.message[0].first_name);

            }
            profileData()
        }
        catch (error) {
            navigate('login')
        }
    }
    else {
        navigate('login')
    }

    return (
        <div><p>Welcome to HomePage {newData}</p></div >
    )

}

export default HomePage