import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/pages/menu/menu.module.scss"
import Link from "next/link";
import { dishesFilter, dishesData } from "src/components/dishes/dishesData"
import Dishes from "@/components/dishes/dishes";
import { Input, Modal } from "antd";
const { Search } = Input;

const Menu = (props: any) => {
    const [dishesFilters, setFilters] = useState<any>({})
    const [dishesFiltersPicked, setFiltersPicked] = useState<any>([])
    const [queryString, setQueryString] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dishes, SetDishes] = useState<any>([])

    const showModal = () => {
        setIsModalOpen(true);
    };
    useEffect(() => {
        SetDishes(dishesData);
        console.log(dishesData)
    }, [])
    useEffect(() => {
        let dishes = dishesData
        if (queryString) {
            dishes = dishes.filter((el: any, i: number) => {
                //console.log(el.name.toLowerCase())
                return el.name.toLowerCase().includes(queryString)
            })
        }
        if (dishesFiltersPicked.length > 0) {
            dishes = dishes.filter((el: any, i: number) => {
                let result = dishesFiltersPicked.map((elPicked: any) => {
                    // console.log(el[Object.keys(elPicked)[0]], Object.keys(elPicked)[0], Object.values(elPicked)[0])
                    return el[Object.keys(elPicked)[0]].includes(Object.values(elPicked)[0])
                })
                console.log(result)
                return result.includes(true)
            })
        }
        SetDishes(dishes)
    }, [queryString, dishesFiltersPicked])

    const onSearch = (el: any) => {
        if (el.target) {
            setQueryString(el.target.value.trim().toLowerCase())
        }

    }
    const handleOk = () => {
        console.log(dishesFilter)
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const deleteFilter = (type: any, el: any) => {
        let temp_filters = { ...dishesFilters }
        temp_filters[type].add(el)
        let temp_filtersPicked = [...dishesFiltersPicked]
        temp_filtersPicked = temp_filtersPicked.filter((obj) => {
            return Object.values(obj)[0] != el
        })

        setFilters(temp_filters)
        setFiltersPicked(temp_filtersPicked)

    }

    const addFilter = (type: any, el: any) => {
        let temp_filtersPicked = [...dishesFiltersPicked]
        let obj: any = {}
        obj[type] = el
        temp_filtersPicked.push(obj)
        let temp_filters = { ...dishesFilters }
        temp_filters[type].delete(el)

        setFilters(temp_filters)
        setFiltersPicked(temp_filtersPicked)

    }


    const mapFilterType = (type: string) => {
        if (dishesFilters[type]) {
            let htmlElements: Array<JSX.Element> = []
            for (const el of dishesFilters[type]) {
                htmlElements.push(<div onClick={() => addFilter(type, el)} className={styles.button_filter_wrapper}>{el}</div>)
            }
            return htmlElements;
        }
    }

    useEffect(() => {
        setFilters(dishesFilter)
    }, [])


    return (
        <>
            <div style={{ position: "relative", height: "84vh" }}>
                <Search placeholder="Wyszukaj danie po nazwie"
                    allowClear
                    onSearch={onSearch}
                    onChange={onSearch}
                    style={{ width: "70%", marginLeft: "10%" }}
                />
                <div
                    onClick={showModal}
                    style={{ cursor: 'pointer', display: "inline-block", fontSize: "1.6rem", marginLeft: "0.6rem" }}>
                    Filtruj </div>
                <Modal title="Filter:" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div>
                        <p style={{ display: "inline-block" }}>Obecne filtry:</p>
                        <div style={{ display: "inline-block" }} className={styles.inline_buttons_wrapper}>
                            {(dishesFiltersPicked).map((el: any, i:any) => {
                                console.log(el)
                                if (Object.values(el).length > 0) {
                                    return (<div key={i} onClick={() => deleteFilter(Object.keys(el)[0], Object.values(el)[0])} className={styles.button_filter_wrapper}>{Object.values(el)[0] + " (x)"}</div>)
                                }
                            })}
                        </div>


                    </div>
                    <hr />
                    <div>
                        <p>Cena:</p>
                        <div>

                        </div>
                        <p>Składniki:</p>
                        <div className={styles.inline_buttons_wrapper}>
                            {mapFilterType("ingredients")}
                        </div>
                        <p>Kuchnia:</p>
                        <div className={styles.inline_buttons_wrapper}>
                            {mapFilterType("type")}
                        </div>
                        <p>Typ jedzenia:</p>
                        <div className={styles.inline_buttons_wrapper}>
                            {mapFilterType("typeOfFood")}
                        </div>
                    </div>

                </Modal>
                <Dishes filteredDishes={dishes} />
            </div>
        </>
    )

}

export default Menu;