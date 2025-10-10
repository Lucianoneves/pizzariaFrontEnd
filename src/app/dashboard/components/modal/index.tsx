"use client"

import styles from './styles.module.scss'
import { X } from 'lucide-react'
import { use } from 'react'
import { OrderContext } from '@/providers/order'
import { calculeTotalOrder } from '@/lib/helper'

export function Modalorder() {
  const { onRequestClose, order, orderItems, finishOrder } = use(OrderContext)

  if (!order) return null // evita erro se não tiver pedido selecionado


  async function handleFinishOrder() {
   if (!order) return
  await finishOrder(order.id)
  onRequestClose()
  }

  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button className={styles.dialogBack} onClick={onRequestClose}>
          <X size={40} color="#FF3f4b" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes do pedido</h2>

          <span className={styles.table}>
            Mesa <b>{order.table}</b>
          </span>

        {order.name && (
          <span className={styles.name}>
            Nome da Mesa: <b>{order.name}</b>
          </span>
        )}


          {orderItems.map((item) => (
            <section className={styles.item} key={item.id}>
              <span>
                Qtd:{item.amount} - <b>{item.product.name} - R${parseFloat(item.product.price) * item.amount}</b></span> {/* Exibe a quantidade, nome do produto e o preço total do item */}
              <span className={styles.description}>
                {item.product.description}
              </span>
            </section>
          ))}

          <h3 className={ styles.total}> Valor Total: R$ {calculeTotalOrder(orderItems)}</h3>   {/* Exibe o valor total do pedido */}

          <button className={styles.buttonOrder} onClick={handleFinishOrder}>
            Concluir pedido
          </button>
        </article>
      </section>
    </dialog>
  )
}
