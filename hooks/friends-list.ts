import { useQuery } from '@tanstack/react-query';
import SonderApi from '../api';
import useCurrentUser from './current-user';
import { ReactQueryKeys } from '../types/types';

interface Friend {

  id: string;
  name: string;
  username: string;
  profile_image: string;
  bio: string;
}

export const useFriendsList = () => {
    const { userProfile } = useCurrentUser()
    const { isLoading, data } = useQuery({
        queryKey: [ReactQueryKeys.FRIENDS_LIST, userProfile?.id],
        queryFn: async () => {
            const response = await SonderApi.get(`/friends/list`, {
                params: {
                    user_id: userProfile?.id
                }
            });
            return response.data.data as Friend[];
        },
        enabled: !!userProfile?.id,
    });

  return { isLoading, data };
};