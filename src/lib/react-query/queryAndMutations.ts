import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    createUserAccount,
    signInAccount,
    signOutAccount,
    createNewPost,
    getRecentPosts,
    likePost,
    savePost,
    deleteSavedPost,
    getCurrentUser,
    getPostById,
    updatePost,
    deletePost,
    getUsersPosts,
    searchPosts,
    getAllUsers,
    getSavedPosts,
    getInfinitePostScroll,
    getUsers,
    getUserById
} from '../appwrite/api';
import { INewUser, INewPost, IUpdatePost } from '@/types';
import { QUERY_KEYS } from './queryKeys';

// Auth Services

export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    });
}
export const useSignInAccountMutation = () => {
    return useMutation({
        mutationFn: (user: { email: string, password: string }) => signInAccount(user)
    });
}

export const useSignOutAccountMutation = () => {
    return useMutation({
        mutationFn: signOutAccount
    });
}

// Post Services

export const useCreatePostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: INewPost) => createNewPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export const useGetRecentPostsMutation = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts,
    });
}

export const useLikedPostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, likesArray }: { postId: string; likesArray: string[] }) => likePost(postId, likesArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useSavePostMutation = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, postId }: { userId: string; postId: string }) => savePost(userId, postId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            });
        },
    });
};

export const useDeleteSavedPostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] });
        }
    });
}

export const useGetPostByIdMutation = (postId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId
    })
}

export const useUpdatePostMutaion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: IUpdatePost) => updatePost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
        }
    })
}

export const useDeletePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, imageId }: { postId: string, imageId: string }) => deletePost(postId, imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

// User's Post Mutation

export const useGetUsersPostsMutation = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
        queryFn: () => getUsersPosts(userId),
        enabled: !!userId,
    });
}


// User Mutations

export const useGetCurrentUserMutation = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser,
    });
};

export const useGetPostMutation = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
        initialPageParam: undefined,
        queryFn: getInfinitePostScroll as any,
        getNextPageParam: (lastPage: any) => {

            if (lastPage && lastPage.documents.length === 0) {
                return null;
            }

            const lastId = lastPage?.documents[lastPage.documents.length - 1].$id;

            return lastId;
        },

    });
};

export const useSerarhPostMutation = (searchTerm: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
        queryFn: () => searchPosts(searchTerm),
        enabled: !!searchTerm,
    });
};

export const useGetAllUsersMutation = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: () => getAllUsers(),
    });
};

export const useGetUsersSavedPostMutatation = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.USERS_SAVED_POST_DETAILS],
        queryFn: () => getSavedPosts(userId),
        enabled: !!userId
    });
};

export const useGetUsersMutation = (limit: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: () => getUsers(limit)
    });
}


export const useGetUserByIdMutation = (userId: string)=>{
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID],
        queryFn: ()=> getUserById(userId)
    })
}