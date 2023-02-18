import React, { useState, useEffect } from 'react'
import Dish from "./dish/dish"
import style from "@/styles/components/dishes/dishes.module.scss"
const Dishes = ({ filteredDishes }: { filteredDishes: any }) => {

    useEffect(() => {
        console.log(filteredDishes.map((el: any) => console.log(el)))
    }, [])
    return (
        <>
            <div className={style.dishes_wrapper}>
                {filteredDishes.map((dish: any, index: any) => {
                    return (
                        <Dish dish={dish} key={index} />
                    )
                })}
            </div>
        </>
    )


}

export default Dishes;