import React from 'react';
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "./header/index"
import { AuthContext } from '@/context/auth';

const PageLayout = (props: any) => {

    const router = useRouter();

    const _auth: any = useContext(AuthContext)

    useEffect(() => {
        if (router.route == "/addDish") {
            if (_auth.user.uid == null) {
                router.push('/menu')
            }
        }

    }, [router.route])


    return (
        <>
            <Header />
            {props.children}
        </>
    )

}

export default PageLayout;