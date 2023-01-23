import React, { useState, useEffect } from 'react'
import dishesData from "./dishesData"
import Dish from "./dish/dish"
import style from "@/styles/components/dishes/dishes.module.scss"
const Dishes = () => {
    const [dishes, SetDishes] = useState<any>([])

    useEffect(() => {
        SetDishes(dishesData);
        console.log(dishesData)
    }, [])


    return (
        <>
            <div className={style.dishes_wrapper}>
                {dishes.map((dish: any, index: any) => {
                    return (
                        <Dish dish={dish} key={index} />
                    )
                })}
            </div>
        </>
    )


}

export default Dishes;