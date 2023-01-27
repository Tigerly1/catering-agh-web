import React from 'react';
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "./header/index"

const PageLayout = (props: any) => {

    const router = useRouter();
    //useContext
    return (
        <>
            <Header />
            {props.children}
        </>
    )

}

export default PageLayout;