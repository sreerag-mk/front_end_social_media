
import { useNavigate } from 'react-router-dom';
import DataStyle from './Data.module.css'


const Data = (props: { group: { id: number; name: string; profilePicture: string } }) => {
    const navigate = useNavigate()
    console.log(props)
    console.log('the props is above')
    async function handleClick() {
        navigate('/profile', { state: props.group.id })
    }
    return (
        <div className={DataStyle.main} onClick={handleClick} onKeyUp={handleClick}>
            <img src={props.group.profilePicture} alt="" />
            <h5>{props.group.name}</h5>

        </div>
    )
}

export default Data