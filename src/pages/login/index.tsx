import React, { useContext, useEffect, useState } from "react";
import Dishes from "@/components/dishes/dishes";
import { Input, Modal, Button } from "antd";
import { icons } from "antd/es/image/PreviewGroup";
const { Search } = Input;

const Signup = (props: any) => {
    
    return (
        <div style={{display:"flex", flexDirection:"column", position:"relative", alignItems:"center"}}>
            <h2 style={{textAlign:'center', marginTop: "2rem"}}>Sign in</h2>
            <Input placeholder="username" aria-label="username" style={{width:"20rem", alignItems:"center",marginTop:"1rem"}}/>
            <Input.Password placeholder="input password" style={{width:"20rem", alignItems:"center", textAlign:"center", marginTop:"1rem"}}/>
            <Button style={{width:"16rem", alignItems:"center", textAlign:"center", marginTop:"1rem"}} block>Login</Button>
        </div>
    )


}

export default Signup