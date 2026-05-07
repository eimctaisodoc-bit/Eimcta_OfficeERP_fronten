import { useQueries, useQueryClient, Mutation, useMutation, QueryClientProvider, QueryClient, } from "@tanstack/react-query";
import api from "../../api/axios";
import { Get_schedule_only, getDetails,Get_Org_Details_Only } from "../../api/role.api";

export const useGet = () => {
    const queryClient = useQueryClient();
    const getDetails_ = useMutation({
        mutationFn: getDetails,
        onSuccess: (data) => {
            // console.log('from postman', data.user)
            queryClient.setQueryData(["getdetails"], data?.user);
        },
        onError: (err) => {
            console.log("mutation error", err);
        }
    })
    const getScheduleOnly_ = useMutation({
        mutationFn: Get_schedule_only,
        onSuccess: (data) => {
            queryClient.setQueryData(["get_scheduleonly"], data);
        },
        onError: () => {
            console.log("erro")
        }
    })
    const getOnlyOrgDetails_ = useMutation({
        mutationFn: Get_Org_Details_Only,
        onSuccess: (data) => {
            queryClient.setQueryData(["get_org_details_only"], data);
        },
        onError: () => {
            console.log("erro")
        }
    })
    return {
        getDetails_,
        getScheduleOnly_,
        getOnlyOrgDetails_
    }
}
