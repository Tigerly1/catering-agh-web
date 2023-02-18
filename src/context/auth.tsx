import { requestComponent } from "@/network/request";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserType {
    // email: string | null;
    uid: string | null;
    // emailVerified: boolean | null;
    // token: string | null;
}

export const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState<UserType>({ uid: null });
    const [isInitialized, setIsInitialized] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const signInUserByCookie = async () => {
        let res: any = await requestComponent({
            url: "/api/auth/signin",
            method: "POST",
        }).then(res => res.json());
        if (res) {
            console.log(res)
        }

        if (res.error) {

        }
        if (res.user) {
            setUser({ uid: res.user })
            console.log(user.uid)
        }
    }

    useEffect(() => {
        signInUserByCookie()
    }, []);

    return (
        <AuthContext.Provider value={{ user, isInitialized, setUser }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};