import Head from 'next/head'
import styles from '../styles/Home.module.css'
import img from '../img/fav.ico'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Power BI- Report</title>
        <meta name="description" content="Power BI Report" />
        <link rel="icon" href={img} />
      </Head>
  
    </div>
  )
}
