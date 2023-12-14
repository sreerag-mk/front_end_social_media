
import HomeStyle from '../components/Homepage.module.css'
import '../components/container.css'
import axios from '../api/axios';
import { useEffect, useState } from 'react';
import FeedCard from '../components/FeedCard';

const loginUrl = '/service/getfeed'

function HomePage() {
    const [feed, setFeed] = useState([]);
    const sendData = {
        page: 1,
        size: 42
    }

    const user: string | null = localStorage.getItem('userInfo');
    let userparse: string | null = null;
    userparse = JSON.parse(user);
    const headers = {
        'Authorization': `Bearer ${userparse}`
    };


    useEffect(() => {
        async function Feeds() {
            const { data } = await axios.get(loginUrl, {
                params: sendData,
                headers: headers
            })
            const feedDetail = data.message
            setFeed(feedDetail)
        }


        Feeds()
    }, [])
    return (
        <div className={`${HomeStyle.container} ${HomeStyle.main}`}>
            {feed.map(feeds => (
                <FeedCard key={feeds.id} feed={feeds} />
            ))}
        </div >
    )
}

export default HomePage