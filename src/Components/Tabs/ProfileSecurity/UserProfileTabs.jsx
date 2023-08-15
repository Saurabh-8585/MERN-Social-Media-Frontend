import { BsShieldLockFill } from 'react-icons/bs'
import { AiOutlineForm, AiOutlineUserDelete } from 'react-icons/ai';
import UpdateInfo from "./Forms/UpdateInfo";
import DeleteAccount from "./Forms/DeleteAccount";
import ResetPassword from "./Forms/ResetPassword";
import { Tab, Tabs } from "../Tabs";


export default function UserProfileTabs() {
    return (
        <>
            <Tabs>
                <Tab label="Update" icon={<AiOutlineForm />}>
                    <div className="py-4">
                        <UpdateInfo />
                    </div>
                </Tab>
                <Tab label="Security" icon={<BsShieldLockFill />}>
                    <div className="py-4">
                        <ResetPassword />
                    </div>
                </Tab>
                <Tab label="Delete" icon={<AiOutlineUserDelete />}>
                    <div className="py-4">
                        <DeleteAccount />
                    </div>
                </Tab>
            </Tabs>
        </>
    );
}