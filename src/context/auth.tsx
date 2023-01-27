import React, { createContext, useContext, useEffect, useState } from "react";

interface UserType {
    email: string | null;
    uid: string | null;
    emailVerified: boolean | null;
    token: string | null;
}

export const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState<UserType>({ email: null, uid: null, emailVerified: null, token: null });
    const [isInitialized, setIsInitialized] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // const unsubscribe = onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         setUser({
        //             email: user.email,
        //             uid: user.uid,
        //             emailVerified: user.emailVerified,
        //         });
        //         setIsInitialized(true);
        //     } else {
        //         setUser({ email: null, uid: null, emailVerified: null });
        //         setIsInitialized(true);
        //     }
        // });
        // setLoading(false);
        // return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isInitialized }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};