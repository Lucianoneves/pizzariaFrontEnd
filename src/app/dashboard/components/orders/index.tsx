import styles from  './styles.module.scss'
import { RefreshCcw } from 'lucide-react'

export function Orders(){
    return(
        <main className={styles.container}>

            <section className={ styles.containerHeader}>
            <h1> Ultimos Pedidos</h1>
            <button>
                <RefreshCcw size={16} color=  "#911f1f"/>
            </button>
            </section>

            <section className={styles.listOrders}>

                <button
                 className= {styles.orderItem}
                >
                    <div  className={ styles.tag}></div>
                    <span> Mesa 10</span>
                </button>

                <button
                 className= {styles.orderItem}
                >
                    <div  className={ styles.tag}></div>
                    <span> Mesa 10</span>
                </button>
            </section>
        </main>
         
    )
}