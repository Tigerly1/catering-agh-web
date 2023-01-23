import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/layout/header.module.scss"
import Link from "next/link";

const Header = (props: any) => {
    const router = useRouter();

    return (
        <>
            <div className={styles.navbar_wrapper}>
                <Link href={"/"}>
                    <img
                        className={styles.navbar_logo_wrapper}
                        alt="navbar logo"
                        src="images/logo.png"
                    />
                </Link>
                <Link href={"/menu"}>
                    <span>Menu</span>
                </Link>
                <Link href={"/add-dish"}>
                    <span>Dodaj danie</span>
                </Link>
                <Link href={"/bucket"}>
                    <img
                        className={styles.navbar_logo_wrapper}
                        alt="navbar busket"
                        src="images/basket.png"
                    />
                </Link>
            </div>
        </>
    )

}

export default Header;