// src/hooks/useRecruitment.js
import { useQuery } from '@tanstack/react-query';

import api from '../../api/axios';
import { getSessionUser } from '../utils';

export const useRecruitmentData = () => {
  const user = getSessionUser();
  const role = user?.role;
  // console.log("User role in useRecruitmentData:", role);
  return useQuery({
    queryKey: ['recruitment'],
    queryFn: async () => {
      const { data } = await api.get('/admin/recruitment');
      return data;
    },

    enabled: role === 'admin',

    retry: false,
  });
};
export const useRecruitmentDataForClient = () => {
  const user = getSessionUser();
  const role = user?.role;
  // console.log("User role in useRecruitmentDataForClient:", role);
  return useQuery({
    queryKey: ['recruitmentForClient'],
    queryFn: async () => {
      const { data } = await api.get('/client/recruitment');
      console.log('from client ',data)
      return data;
    },
    enabled: role === 'admin',
    retry: false,
  });
};