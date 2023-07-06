import React, { useMemo } from 'react'
import { useFollowUserMutation, useUnFollowUserMutation } from '../features/user/UserServices'
import { toast } from 'react-hot-toast'
import getCurrentUser from '../utils/CurrentUser'

const useHandleUsersAction = ({ userInfo, user }) => {
    const [followUser,] = useFollowUserMutation()
    const [unFollowUser] = useUnFollowUserMutation()

    const follow = async (userID) => {
        if (user) {

            const response = await followUser(userID);
            if (response.error) {
                toast.error(response.error.data.message)
            }

        }
        else {
            toast.error('Please login')
        }
    }
    const unFollow = async (userID) => {
        if (user) {

            const response = await unFollowUser(userID)
            if (response.error) {
                toast.error(response.error.data.message)
            }

        }
        else {
            toast.error('Please login')
        }

    }

    const isFollowing = useMemo(() => {
        if (user) {
            if (userInfo?.followers) {
                return userInfo.followers.some((follower) => follower._id === user);
            }
        }
        return false;
    }, [userInfo, user,]);
    return (
        { follow, unFollow, isFollowing }
    )
}

export default useHandleUsersAction