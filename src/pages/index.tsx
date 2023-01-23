import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/home/home.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div>


        <img src="images/food.png" alt="food" className={styles.home_image} />
      </div>
    </>
  )
}
