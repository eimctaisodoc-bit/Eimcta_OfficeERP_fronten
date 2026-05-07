import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";
import { postStaffOrgDetails ,updateOnlyOrgDetails,Post_message_call_schedule, Post_schedule_only} from "../../api/role.api";

export const UseAdd = () => {
    const queryClient = useQueryClient();
    
    const addOrgLeadDetails = useMutation({
        mutationFn: postStaffOrgDetails,
        onSuccess: (data) => {
            queryClient.setQueryData(["addOrgLead"], data.user);
        }
    })
    const addMsg_call_sch=useMutation({
        mutationFn:Post_message_call_schedule,
        onSuccess:(data)=>{
            queryClient.setQueryData(["add_mcsc"], data.user)
        }
    })
    const add_sch_Only=useMutation({
        mutationFn:Post_schedule_only,
        onSuccess:(data)=>{
            queryClient.setQueryData(["add_scheduleonly"], data.user)
        }
    })
    const update_Only_OrgDetails = useMutation({
        mutationFn:updateOnlyOrgDetails,
        onSuccess: (data) => {
            queryClient.setQueryData(["update_org_details_only"], data.user);
            console.log("Data after update_org_details_only mutation:", data);
        }
    }
    )
    return {
        addOrgLeadDetails,
        addMsg_call_sch,
        add_sch_Only,
        update_Only_OrgDetails
    }
}