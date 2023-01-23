import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/layout/header.module.scss"
import Link from "next/link";
import Dishes from "@/components/dishes/dishes";

const Menu = (props: any) => {


    return (
        <>
            <div style={{ position: "relative", height: "90vh" }}>

                <Dishes />
            </div>
        </>
    )

}

export default Menu;