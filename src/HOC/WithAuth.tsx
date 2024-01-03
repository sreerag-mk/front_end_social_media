/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const feedURL: string = process.env.REACT_APP_FEEDS ?? '';
const UpdatedComponent = (OriginalComponent: React.FC) => {
    function NewComponent() {
        const Navigate = useNavigate();
        const user: string | null = localStorage.getItem('userInfo');
        if (user !== null) {
            const fetchData = async () => {
                try {
                    await axios.get(feedURL);
                } catch (error) {
                    Navigate('/login');
                }
            };
            fetchData();
        } else {
            Navigate('/login');
        }

        return <OriginalComponent />;
    }

    return NewComponent;
};

export default UpdatedComponent;
