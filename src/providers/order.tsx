"use client"
import { createContext, ReactNode, useState } from 'react'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'
import { toast } from 'sonner';
import { use } from 'react'
import { useRouter } from 'next/dist/client/components/navigation';

interface ProductProps {
  id: string;
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;        //Tipagem //
}

interface OrderInfoProps {
  id: string;
  table: number;
  name: string | null;
  draft: boolean;
  status: boolean;
}

 export interface OrderItemProps {
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
  finishOrder: (order_id: string) => Promise<void>; // função para concluir o pedido

}

type OrderProviderProps = {
  children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState<OrderInfoProps | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItemProps[]>([])
  const router = useRouter();

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

  function onRequestClose() {      //
    setIsOpen(false)
    setOrder(null)
    setOrderItems([])
  }

  async function finishOrder(order_id: string) { // salva o ID do pedido a ser concluído
    const token = getCookieClient()

    const data = {
      order_id: order_id,
    }


    try {
      await api.put('/order/finish', data, {
        headers: {
          Authorization: `Bearer ${token}`, // inclui o token no cabeçalho
        },

      })
    } catch (error) {
      console.error(error);
      toast.error("Erro ao concluir o pedido. Tente novamente.")
      return;
    }

    toast.success("Pedido concluído com sucesso!")
    router.refresh() // atualiza a página para refletir as mudanças  
    setIsOpen(false)
  }





  return (
    <OrderContext.Provider      // sse for necessário, você pode adicionar mais funções e estados ao contexto
      value={{
        isOpen,
        onRequestOpen,
        onRequestClose, // disponibiliza a função onRequestClose no contexto
        finishOrder, // disponibiliza a função finishOrder no contexto
        order, // agora é apenas o pedido selecionado
        orderItems, // lista de produtos do pedido
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
