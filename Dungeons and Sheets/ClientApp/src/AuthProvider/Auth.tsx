import axios from "axios";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { useNavigate, useLocation } from "react-router-dom";

interface User {
    email: string
    name: string
    password: string
}

interface AuthContextType {
    user?: User;
    loading: boolean;
    error?: any;
    login: (email: string, password: string) => void;
    signUp: (email: string, name: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (error) setError(null);
    }, [location.pathname]);

    useEffect(() => {
        axios.post<User>('api/User/CheckSession', {id: localStorage.getItem('sessionId')})
            .then((user) => setUser(user.data))
            .catch((_error) => { })
            .finally(() => setLoadingInitial(false));
    }, []);

    function login(email: string, password: string) {
        setLoading(true);
        axios.post<User>('api/User/Login', { email, password })
            .then((res) => {
                let user = res.data;
                setUser(user);
                SetSessionId(user)
                navigate("/")
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }
    function SetSessionId(user: User) {
        axios.post<string>('api/User/GetSessionId', user)
            .then((res) => {
                localStorage.setItem('sessionId', res.data)
                navigate("/")
            })
    }
    function signUp(email: string, name: string, password: string) {
        setLoading(true);
        axios.post<User>('api/User/SignUp', { email, name, password })
            .then((res) => {
                let user = res.data;
                setUser(user)
                SetSessionId(user)
                navigate("/")
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    function logout() {
        console.log(user)
        axios.post('api/User/Logout', {email: user?.email, name: user?.name, password: user?.password}).then(() => setUser(undefined));
        localStorage.removeItem('sessionId')
    }

    const memoedValue = useMemo(
        () => ({
            user,
            loading,
            error,
            login,
            signUp,
            logout,
        }),
        [user, loading, error]
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext);
}