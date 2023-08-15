import React, { useEffect } from 'react'
import UserProfileTabs from '../Components/Tabs/profile/UserProfileTabs'

const Settings = () => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <div className="flex justify-center items-center flex-col">
            <UserProfileTabs />
        </div>
    )
}

export default Settings