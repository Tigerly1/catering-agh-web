import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/layout/header.module.scss"
import Link from "next/link";
import { AuthContext } from "@/context/auth";
import { Badge, Button, Layout, Menu, Typography } from "antd";
import { deleteCookie, getCookie, getCookies, setCookie } from "cookies-next";
import BucketModal from "@/components/bucket";
import { BucketContext } from "@/context/bucket";

const Header = (props: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const {bucket} = useContext<any>(BucketContext)


    const router = useRouter();
    const _auth: any = useContext(AuthContext)

    const handleOpenModal = () => {
        setModalVisible(true);
      };
    
      const handleCloseModal = () => {
        setModalVisible(false);
      };

    return (
        <>
            <Layout.Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', backgroundColor: "white" }}>

                <Menu
                    style={{ display: 'block', justifyContent: 'center', flex: 'row', margin: 'auto' }}
                    theme="light"
                    mode="horizontal"
                    //defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1', label: <Link href="/"> <img
                                width="20px"
                                height="20px"
                                alt="navbar logo"
                                src="images/logo.png"
                                style={{ paddingTop: '10px' }}
                            /></Link>
                        },
                        { key: '2', label: <Link href="/menu">Menu</Link> },
                        {
                            key: '3', label: _auth.user.uid ?
                                <Link href={"/addDish"}>
                                    <span>Dodaj danie</span>
                                </Link> : null
                        },

                        {
                            key: '5', label: <Badge count={bucket.length} showZero offset={[0,20]}>
                                <img
                                    className={styles.navbar_logo_wrapper}
                                    width="32px"
                                    height="32px"
                                    style={{paddingTop: '4px'}}
                                    alt="navbar busket"
                                    src="images/basket.png"
                                    onClick={handleOpenModal}
                                /></Badge>
                            , style: { float: "right" }
                        },
                        {
                            key: '4', label: _auth.user.uid ? <Link href={'/'}>
                            </Link> : <Link href={"/signup"}>
                                <span >Sign up</span>
                            </Link>, style: { float: "right" }
                        },
                        {
                            key: '6', label: _auth.user.uid ? <Button onClick={() => {
                                _auth.setUser({ uid: null })
                                deleteCookie('authorization')
                                deleteCookie('x-refresh-token')
                            }}>Signout</Button>

                                : <Link href={"/login"} >
                                    <span >Sign in</span>
                                </Link>, style: { float: "right" }
                        },


                        { key: '11', label: _auth.user.uid ? <Typography.Title level={4} style={{ marginTop: '0.5rem' }} >User: {(_auth) ? _auth.user.uid : ""}</Typography.Title> : "", style: { float: "right" } },

                    ]}

                />


            </Layout.Header>
            <BucketModal visible={modalVisible} onClose={handleCloseModal} />
        </>
    )

}

export default Header;
