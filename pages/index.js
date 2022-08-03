import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import ManualHeader from '../components/ManualHeader'
// import LotteryEntrance from "components/LotteryEntrance"
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart Contract Lottery</title>
                <meta name="description" content="Our smart contract Lottory"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Header/>

            Hello !
            <LotteryEntrance/>
        </div>
    )
}
