"use client"

import styles from './styles.module.scss'
import { X } from 'lucide-react'
import { use } from 'react'
import { OrderContext } from '@/providers/order'

export function Modalorder() {
  const { onRequestClose, order, orderItems } = use(OrderContext)

  if (!order) return null // evita erro se não tiver pedido selecionado

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
              <b>{order.name}</b>
            </span>
          )}

          {orderItems.map((item) => (
            <section className={styles.item} key={item.id}>
              <span>{item.amount} - <b>{item.product.name}</b></span>
              <span className={styles.description}>
                {item.product.description}
              </span>
            </section>
          ))}

          <button className={styles.buttonOrder}>
            Concluir pedido
          </button>
        </article>
      </section>
    </dialog>
  )
}
