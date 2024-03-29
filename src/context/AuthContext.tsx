import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: ""
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    setUser: () => { },
    isLoading: false,
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean,
}


const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {


    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();


    const checkAuthUser = async () => {
        setIsLoading(true);
        try {
            const currentAccount = await getCurrentUser();

            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio,
                });
                setIsAuthenticated(true);
                return true;
            }

            return false;
        } catch (error) {
            console.log("Error in Auth Context", error);
            return false;

        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('cookieFallback') === null ||
            localStorage.getItem('cookieFallback') === '[]'
        ) {
            navigate("/sign-in");
        }
        checkAuthUser();

    }, [localStorage.getItem('cookieFallback')]);

    const userValue = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }

    return (
        <AuthContext.Provider value={userValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);