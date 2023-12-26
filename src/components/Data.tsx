
import DataStyle from './Data.module.css'


const Data = (props: { group: { id: number; name: string; profilePicture: string } }) => {
    console.log(props)
    console.log('the props is above')
    return (
        <div className={DataStyle.main}>
            <img src={props.group.profilePicture} alt="" />
            <h5>{props.group.name}</h5>

        </div>
    )
}

export default Data