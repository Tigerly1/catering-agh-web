import { requestComponent } from "@/network/request";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth";

interface UserType {
    // email: string | null;
    uid: string | null;
    // emailVerified: boolean | null;
    // token: string | null;
}

export const BucketContext = createContext({});

export const useBucket = () => useContext<any>(BucketContext);

export const BucketContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [bucket, setBucket] = useState<any>([]);
    const _auth = useContext<any>(AuthContext)


    // useEffect(() => {
    //     signInUserByCookie()
    // }, []);

    return (
        <BucketContext.Provider value={{ bucket, setBucket }}>
            {children}
        </BucketContext.Provider>
    );
};