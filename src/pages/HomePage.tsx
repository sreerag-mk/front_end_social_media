
import { useEffect, useState } from 'react';

import HomeStyle from '../components/Homepage.module.css'
import '../components/container.css'
import axios from '../api/axios';
import FeedCard from '../components/FeedCard';
import InfiniteScroll from 'react-infinite-scroll-component';


function HomePage() {
    const [feed, setFeed] = useState<{ media_url: string; userId: number; id: number; profile_picture: string; user_name: string; caption: string | number }[]>([]);
    const [isfeed, setIsfeed] = useState(false);
    const [size, setSize] = useState(3);
    const sendData = {
        page: 1,
        size: size
    }

    async function Feeds() {
        const { data } = await axios.get('/service/feed', {
            params: sendData
        })
        const feedDetail = data.message
        const isFeed = data.success
        setIsfeed(isFeed)
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
            {isfeed ?
                <InfiniteScroll
                    dataLength={feed.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>loading....</h4>}
                >
                    {feed.map(feeds => (
                        <FeedCard key={feeds.id} feed={feeds} />
                    ))}
                </InfiniteScroll> :
                <h5>Nothing to show </h5>
            }

        </div >
    )
}

export default HomePage     