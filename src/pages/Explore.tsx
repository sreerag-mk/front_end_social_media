/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import HomeStyle from '../components/Homepage.module.css';
import '../components/container.css';
import axios from '../api/axios';
import FeedCard from '../components/FeedCard';

const getFeedUrl: string = process.env.REACT_APP_GETFEED ?? '';

function HomePage() {
    const [feed, setFeed] = useState<
        {
            media_url: string;
            userId: number;
            id: number;
            profile_picture: string;
            user_name: string;
            caption: string | number;
        }[]
    >([]);
    const [isfeed, setIsfeed] = useState(false);
    const [size, setSize] = useState(4);



    useEffect(() => {
        const sendData = {
            page: 1,
            size,
        };
        async function Feeds() {
            const { data } = await axios.get(getFeedUrl, {
                params: sendData,
            });
            const feedDetail = data.message;
            const isFeed = data.success;
            setIsfeed(isFeed);
            setFeed(feedDetail);
        }
        Feeds();
    }, [size]);
    const fetchMoreData = () => {
        setSize(size + 3);
    };
    return (
        <div className={`${HomeStyle.container} ${HomeStyle.main}`}>
            {isfeed ? feed && (
                <InfiniteScroll
                    dataLength={feed.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>loading....</h4>}
                >
                    {feed.map((feeds) => (
                        <FeedCard key={feeds.id} feed={feeds} />
                    ))}
                </InfiniteScroll>
            ) : (
                <h5>Nothing to show </h5>
            )}
        </div>
    );
}

export default HomePage;
