import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/layout/header.module.scss"
import Link from "next/link";
import Dishes from "@/components/dishes/dishes";
import antd from "antd";
import {  Input  } from "antd";
const { Search } = Input;

const Menu = (props: any) => {
    const [queryString, setQueryString] = useState("")


    const onSearch = (el:any)=>{
        if( el.target){
            setQueryString(el.target.value.trim().toLowerCase())
        }
        
    }


    return (
        <>
            <div style={{ position: "relative", height: "84vh" }}>
            <Search  placeholder="input search text"
      allowClear
      onSearch={onSearch}
      onChange={onSearch}
       />
                <Dishes filteredValues = {queryString}/>
            </div>
        </>
    )

}

export default Menu;