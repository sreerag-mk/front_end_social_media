
import { useEffect, useState } from 'react';

import HomeStyle from '../components/Homepage.module.css'
import '../components/container.css'
import axios from '../api/axios';
import FeedCard from '../components/FeedCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const getFeedUrl = process.env.REACT_APP_GETFEED

function HomePage() {
    const [feed, setFeed] = useState([]);
    const [size, setSize] = useState(3);
    const sendData = {
        page: 1,
        size: size
    }

    async function Feeds() {
        const { data } = await axios.get(getFeedUrl, {
            params: sendData
        })
        const feedDetail = data.message
        setFeed(feedDetail)
    }
    useEffect(() => {
        Feeds()
    }, [size])
    const fetchMoreData = () => {
        setSize(size + 3)
    }
    return (
        <div className={`${HomeStyle.container} ${HomeStyle.main}`}>
            <InfiniteScroll
                dataLength={feed.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<h4>loading....</h4>}
            >
                {feed.map(feeds => (
                    <FeedCard key={feeds.id} feed={feeds} />
                ))}
            </InfiniteScroll>

        </div >
    )
}

export default HomePage