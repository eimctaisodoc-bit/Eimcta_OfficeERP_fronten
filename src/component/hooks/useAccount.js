import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserAccount, getUserAccounts } from "../../api/register.api";
import { useEffect } from "react";

export const useAccounts = () => {
    const queryClient = useQueryClient();


    const accountsQuery = useQuery({
        queryKey: ["accounts"],
        queryFn: getUserAccounts,
        retry: false,
        enabled: false,
        staleTime: Infinity
    });
    useEffect(() => {
        accountsQuery.refetch()
    }, [])


    const createAccountMutation = useMutation({
        mutationFn: createUserAccount,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
    });

    return {
        accountsQuery,
        createAccountMutation,
    };
};
