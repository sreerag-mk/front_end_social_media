/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import DataStyle from './Data.module.css';

interface DataType {
    readonly group: Readonly<{
        id: number;
        name: string;
        profilePicture: string;
    }>
}

function Data({ group }: DataType) {
    const navigate = useNavigate();
    async function handleClick() {
        navigate('/profile', { state: group.id });
    }
    return (
        <div role='button' tabIndex={0} className={DataStyle.main} onClick={handleClick} onKeyUp={handleClick}>
            <img src={group.profilePicture} alt="" />
            <h5>{group.name}</h5>
        </div>
    );
}

export default Data;
