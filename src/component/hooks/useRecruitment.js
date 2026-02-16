// src/hooks/useRecruitment.js
import { useQuery } from '@tanstack/react-query';

import api from '../../api/axios';
import { getSessionUser } from '../utils';

export const useRecruitmentData = () => {
  const user = getSessionUser();
  const role = user?.role;

  return useQuery({
    queryKey: ['recruitment'],
    queryFn: async () => {
      const { data } = await api.get('/admin/recruitment');
    //   await new Promise(resolve => setTimeout(resolve, 3000));
      return data;
    },
    // Only fetch if the role is exactly 'admin'
    enabled: role === 'admin',
    retry: false, 
  });
};