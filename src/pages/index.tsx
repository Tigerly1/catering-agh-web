import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/home/home.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className={styles.home_image}>
        <div ></div>
        <div className={styles.contact}>
          <h1>
            Kontakt
          </h1>
          <p>
            numer Telefonu: 533901602
          </p>
          <div>
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d320.16260865261995!2d19.9381909!3d50.0619268!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b0e026d46d7%3A0xcba40d674244b5a6!2sFontanna!5e0!3m2!1spl!2spl!4v1674822706097!5m2!1spl!2spl" width="400" height="350"   loading="lazy" ></iframe>
    </div>
        </div>
    

        
      </div>
    </>
  )
}
