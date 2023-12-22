
import detailsStyle from './Details.module.css'
import Data from './Data'

const Details = (heading: { heading: string | null }) => {
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
                <Data />
                <Data />
                <Data />
                <Data />

            </div>
        </div>
    )
}

export default Details