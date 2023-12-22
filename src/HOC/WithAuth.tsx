import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const UpdatedComponent = (OriginalComponent: JSX.IntrinsicAttributes) => {
    function newComponent() {
        const navigate = useNavigate();
        const user: string | null = localStorage.getItem('userInfo');
        if (user !== null) {
            const fetchData = async () => {
                try {
                    const newUser = await axios.get(process.env.REACT_APP_FEEDS);
                    console.log('the data is data---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------')
                    console.log(newUser)
                } catch (error) {
                    navigate('/login')
                }
            };
            fetchData();

        } else {
            console.log("No user info found----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
            navigate('/login')
        }

        return (
            <OriginalComponent />
        )


    }

    return newComponent
}

export default UpdatedComponent;