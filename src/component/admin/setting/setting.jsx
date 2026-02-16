import React from "react"
import { Tab_C } from "../../tab"

import {
    User,
    Settings,
    ShieldCheck,
    FileText
} from 'lucide-react';
import { Policies } from "./policies";
import { Personal } from "./personal";
import { Control_Management } from "./controlmang";
import { General_Setting } from "./generalSetting";
const Admin = {
    Personal: Personal,
    General_Setting: General_Setting,
    Control_Management: Control_Management,
    Policies: Policies
}
const AdminTabTitle = [
    { title: "Personal", icon: User, key: "Personal" },
    { title: "General_Setting", icon: Settings, key: "General_Setting" },
    { title: "Control_Management", icon: ShieldCheck, key: "Control_Management" },
    { title: "Policies", icon: FileText, key: "Policies" }
]
export const A_Setting = () => {

    return (
        <>
            <Tab_C  content={Admin} tab={AdminTabTitle} />
        </>
    )
}