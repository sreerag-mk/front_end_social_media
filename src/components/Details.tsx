import { useEffect, useState } from 'react';
import axios from '../api/axios';

import detailsStyle from './Details.module.css'
import Data from './Data'

const Details = (heading: { heading: string | null }) => {

    console.log(heading.heading)
    const [url, setUrl] = useState('')
    let newUrl = ''
    const [group, setGroup] = useState([]);
    async function groups() {
        console.log('this Is inside the group fnction')
        console.log(url)
        const { data } = await axios.get(newUrl)
        const groupDetail = data.message
        setGroup(groupDetail)
    }

    useEffect(() => {
        if (heading.heading === 'My Group') {
            setUrl('/group/mygroup')
            newUrl = '/group/mygroup'
        }
        else if (heading.heading === 'Friends') {
            setUrl('/follow/getfollowingname')
            newUrl = '/follow/getfollowingname'
        }
        groups()
    }, [])




    return (

        <div className={detailsStyle.detail}>
            <div className={detailsStyle.heading}>
                <div className={detailsStyle.title}>
                    <h5>{heading.heading}</h5>
                </div>
                <div className={detailsStyle.option}>
                    <i className="fa-solid fa-ellipsis-vertical fa-rotate-90"></i>
                </div>
            </div>
            <div className={detailsStyle.data}>
                {group.map(groups => (
                    <Data key={groups.id} group={groups} />
                ))}

            </div>
        </div>
    )
}

export default Details