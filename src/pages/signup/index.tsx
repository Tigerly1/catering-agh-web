import React, { useContext, useEffect, useState } from "react";
import Dishes from "@/components/dishes/dishes";
import { Input, Modal, Button } from "antd";
import { icons } from "antd/es/image/PreviewGroup";
import schema from "src/schema/signup";
import { useFormik } from "formik";
import { requestComponent } from "@/network/request";
import { useRouter } from "next/router";
const { Search } = Input;

const Signup = (props: any) => {
    
    const router = useRouter();
    const form = useFormik({
        initialValues: {
          email: "",
          username: "",
          password: "",
        },
        validationSchema: schema,
        onSubmit: async (values:any, actions:any) => {
          let res: any = await requestComponent({
            url: "/auth/signup",
            data: values,
            method: "POST",
          });
          console.log(res)
          if (res.error) {
            
          }
          if (res.user) {

            router.push("/menu");
          }

        },
      });

    return (
        <div style={{display:"flex", flexDirection:"column", position:"relative", alignItems:"center"}}>
            <h2 style={{textAlign:'center', marginTop: "2rem"}}>Register</h2>
            <Input onChange={form.handleChange("email")}
            placeholder="input email" aria-label="email" style={{width:"20rem", alignItems:"center", marginTop:"2rem"}}/>
            <Input onChange={form.handleChange("username")} placeholder="username" aria-label="username" style={{width:"20rem", alignItems:"center",marginTop:"1rem"}}/>
            <Input.Password onChange={form.handleChange("password")} placeholder="input password" style={{width:"20rem", alignItems:"center", textAlign:"center", marginTop:"1rem"}}/>
            <Button onClick={()=>form.handleSubmit()} style={{width:"16rem", alignItems:"center", textAlign:"center", marginTop:"1rem"}} block>Register</Button>
        </div>
    )


}

export default Signup