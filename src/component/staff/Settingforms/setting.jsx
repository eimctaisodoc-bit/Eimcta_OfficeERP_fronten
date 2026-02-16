import React from "react"
import { Personal } from "../Settingforms/personal.jsx"
import { Profile } from "../Settingforms/profile.jsx"
import { Tab_C } from "../../tab.jsx"
import { ChangePassword } from "../Settingforms/changePassword.jsx"
import {
    User,
    MessageSquare,
    Unlock,
} from 'lucide-react';
const Staff = {
    Profile: Profile,
    Personal: Personal,
    ChangePassword: ChangePassword
}
const StaffTabTitle = [
    { title: "Profile", icon: User, key: "Profile" },
    { title: "Personal", icon: MessageSquare, key: "Personal" },
    { title: "ChangePassword", icon: Unlock, key: "ChangePassword" }
]
export const S_Setting = () => {

    return (
        <>
            <Tab_C content={Staff} tab={StaffTabTitle} />
        </>
    )
}