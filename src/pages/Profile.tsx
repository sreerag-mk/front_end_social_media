
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { fetchProfile } from '../redux/slices/profile/ProfileData'



function Profile() {

    const dispatch = useAppDispatch()
    const state = useAppSelector((state) => state);
    console.log('the state is')
    console.log(state)
    useEffect(() => {
        dispatch(fetchProfile())

    }, [dispatch])
    if (state.profile.isLoading) {
        return <h1>Loading.....</h1>
    }
    return (
        <div className="page">

            {state.profile.data &&
                <><h1>Welcome to profile {state.profile.data.user_name}</h1><h1>Welcome to profile {state.profile.data.user_name}</h1><h1>Welcome to profile {state.profile.data.user_name}</h1><h1>Welcome to profile {state.profile.data.user_name}</h1><h1>Welcome to profile {state.profile.data.user_name}</h1><h1>Welcome to profile {state.profile.data.user_name}</h1><h1>Welcome to profile {state.profile.data.user_name}</h1><h1>Welcome to profile {state.profile.data.user_name}</h1><h1>Welcome to profile {state.profile.data.user_name}</h1><h1>Welcome to profile {state.profile.data.user_name}</h1></>
            }
        </div >
    )


}

export default Profile