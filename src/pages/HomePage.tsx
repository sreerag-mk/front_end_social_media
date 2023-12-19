
import { useEffect, useState } from 'react';
import HomeStyle from '../components/Homepage.module.css'
import '../components/container.css'
import axios from '../api/axios';
import FeedCard from '../components/FeedCard';

const loginUrl = '/service/getfeed'

function HomePage() {
    const [feed, setFeed] = useState([]);
    const [size, setSize] = useState(3);
    const sendData = {
        page: 1,
        size: size
    }


    async function Feeds() {
        const { data } = await axios.get(loginUrl, {
            params: sendData
        })
        const feedDetail = data.message
        setFeed(feedDetail)
    }
    useEffect(() => {
        Feeds()
    }, [size])
    function handleButtonClick() {
        setSize(size + 3)
    }
    return (
        <div className={`${HomeStyle.container} ${HomeStyle.main}`}>

            {feed.map(feeds => (
                <FeedCard key={feeds.id} feed={feeds} />
            ))}
            <button className={HomeStyle.button} onClick={handleButtonClick}>Load more</button>
        </div >
    )
}

export default HomePage