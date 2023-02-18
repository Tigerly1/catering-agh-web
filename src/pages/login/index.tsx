import React, { useContext, useEffect, useState } from "react";
import Dishes from "@/components/dishes/dishes";
import { Input, Modal, Button } from "antd";
import { icons } from "antd/es/image/PreviewGroup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import schema from "@/schema/signin";
import { requestComponent } from "@/network/request";
import { AuthContext } from "@/context/auth";
const { Search } = Input;

const Signup = (props: any) => {

    const _auth = useContext<any>(AuthContext)

    const router = useRouter();
    const form = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: async (values: any, actions: any) => {
            console.log(document.cookie)
            let res: any = await requestComponent({
                url: "/api/auth/signin",
                data: values,
                method: "POST",
            }).then(res => res.json());
            if (res) {
                console.log(res)
            }

            if (res.error) {

            }
            if (res.user) {
                _auth.setUser({ uid: res.user })
                console.log(_auth.user.uid)
                console.log(document.cookie)
                router.push("/menu");
            }

        },
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", position: "relative", alignItems: "center" }}>
            <h2 style={{ textAlign: 'center', marginTop: "2rem" }}>Sign in</h2>
            <Input onChange={form.handleChange("username")} placeholder="username" aria-label="username" style={{ width: "20rem", alignItems: "center", marginTop: "1rem" }} />
            <Input.Password onChange={form.handleChange("password")} placeholder="input password" style={{ width: "20rem", alignItems: "center", textAlign: "center", marginTop: "1rem" }} />
            <Button onClick={() => form.handleSubmit()} style={{ width: "16rem", alignItems: "center", textAlign: "center", marginTop: "1rem" }} block>Log in</Button>
        </div>
    )


}

export default Signup