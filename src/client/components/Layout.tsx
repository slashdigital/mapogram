import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from "next/image"
import Logo from '../assets/logo.png'
import styles from './Layout.module.css'
// import { Icon } from '@iconify/react';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Mapogram' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className={styles.header}>
      <div className={styles.header__left}>
        <Link href="/">
          <Image src={Logo} alt="mapogram logo" className={styles.header__left_image}/>
        </Link>
      </div>
      <div className={styles.header__right}>
        <nav>
          <Link href="/about">
            <button className={styles.header__button_about}>About Us</button>
          </Link>
          <Link href="/users">
            Testing
            {/* <button className={styles.header__button_gallery}>Visit Map Gallery <Icon icon="akar-icons:arrow-right" className={styles.header__button_gallery_icon}/></button> */}
          </Link>
        </nav>
      </div>
    </header>
    {children}
    <footer className={styles.footer}>
      <hr className={styles.footer__line}/>
      <span className={styles.footer__text}>Mapogram 2022. Supported Slash.co and Sponsored by ADPC Grant</span>
    </footer>
  </div>
)

export default Layout
