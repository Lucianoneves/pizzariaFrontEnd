"use client"
import { createContext, ReactNode, useState } from 'react'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'

interface ProductProps {
  id: string;
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

interface OrderInfoProps {
  id: string;
  table: number;
  name: string | null;
  draft: boolean;
  status: boolean;
}

interface OrderItemProps {
  id: string;
  amount: number;
  created_at: string;
  order_id: string;
  product_id: string;
  product: ProductProps;
  order: OrderInfoProps;
}

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderInfoProps | null; // agora é apenas o pedido selecionado
  orderItems: OrderItemProps[]; // lista de produtos do pedido
}

type OrderProviderProps = {
  children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState<OrderInfoProps | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItemProps[]>([])

  async function onRequestOpen(order_id: string) {
    const token = getCookieClient()

      console.log("🔍 ID do pedido clicado:", order_id);

    const response = await api.get("/order/detail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        order_id,
      },
    })

      console.log("📦 Resposta da API:", response.data);

    const items = response.data
    if (items.length > 0) {
      // pega informações do pedido a partir do primeiro item
      setOrder(items[0].order)
    }

    // salva os itens do pedido
    setOrderItems(items)

    setIsOpen(true)
  }

  function onRequestClose() {
    setIsOpen(false)
    setOrder(null)
    setOrderItems([])
  }

  return (
    <OrderContext.Provider
      value={{
        isOpen,
        onRequestOpen,
        onRequestClose,
        order,
        orderItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
