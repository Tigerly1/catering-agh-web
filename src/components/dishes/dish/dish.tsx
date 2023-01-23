import React, { useState, useEffect } from 'react'
import style from "@/styles/components/dishes/dish/dish.module.scss"
import ActionButton from '@/components/buttons/actionButton';

const Dish = (props: any) => {


    return (
        <>
            <div className={style.dish_wrapper}>
                <div className={style.dish_title}>
                    {props.dish.name}
                </div>

                <div className={style.dish_image}>
                    <img src={props.dish.image} />

                </div>
                <div className={style.stars_wrapper}>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                </div>
                
                <div className={style.dish_price}>
                    <span>Cena: {props.dish.price}$</span>
                </div>
                <div className={style.dish_buttons_wrapper}>
                    <ActionButton text={"Kup"} />
                </div>
            </div>
        </>
    )


}

export default Dish;