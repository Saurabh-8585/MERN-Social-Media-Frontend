import React, { useEffect } from 'react'
import TabsRender from '../Components/Tabs/UserTab'

const Settings = () => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <div className="flex justify-center items-center flex-col">
            <TabsRender />
        </div>
    )
}

export default Settings