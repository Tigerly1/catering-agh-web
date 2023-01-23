import React, { useState, useEffect } from 'react'
import dishesData from "./dishesData"
import Dish from "./dish/dish"
import style from "@/styles/components/dishes/dishes.module.scss"
const Dishes = ({filteredValues}:{filteredValues:any}) => {
    const [dishes, SetDishes] = useState<any>([])

    useEffect(() => {
        SetDishes(dishesData);
        console.log(dishesData)
    }, [])

    useEffect(() => {
        let dishes = dishesData
        if(filteredValues){
            dishes = dishes.filter((el:any, i:number)=>{
                console.log(el.name.toLowerCase())
                return el.name.toLowerCase().includes(filteredValues)
            })
        }
        SetDishes(dishes)
    }, [filteredValues])

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