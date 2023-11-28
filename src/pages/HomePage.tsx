import React from 'react'

function HomePage() {
    const user: string | null = localStorage.getItem('userInfo');

    let userparse: any = null;
    if (user !== null) {
        userparse = JSON.parse(user)
    }
    if (userparse !== null) {
        const data = userparse
        return (
            <div><p>HomePage `${data}`</p></div >
        )
    }
    else {
        return (
            <div><p>HomePage</p></div >
        )
    }

}

export default HomePage