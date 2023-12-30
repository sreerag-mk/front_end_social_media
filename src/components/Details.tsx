import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

import detailsStyle from './Details.module.css'
import Data from './Data'

interface DetailsProps {
    heading: string | null;
}

const Details: React.FC<DetailsProps> = ({ heading }) => {

    let newUrl = ''
    interface Group {
        id: number;
    }
    const [group, setGroup] = useState<Group[] | undefined>(undefined);
    async function groups() {
        const { data } = await axios.get(newUrl)
        const groupDetail = data.message
        setGroup(groupDetail)
    }

    useEffect(() => {
        if (heading === 'My Group') {
            newUrl = '/group/mygroup'
        }
        else if (heading === 'Friends') {
            newUrl = '/follow/getfollowingname'
        }
        groups()
    }, [])




    return (

        <div className={detailsStyle.detail}>
            <div className={detailsStyle.heading}>
                <div className={detailsStyle.title}>
                    <h5>{heading}</h5>
                </div>
                <div className={detailsStyle.option}>
                    <i className="fa-solid fa-ellipsis-vertical fa-rotate-90"></i>
                </div>
            </div>
            <div className={detailsStyle.data}>
                {group ?
                    group.map(groups => (
                        <Data key={groups.id} group={groups} />
                    ))

                    :
                    <h3>Nothing to show</h3>
                }

            </div>
        </div>
    )
}

export default Details