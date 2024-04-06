import { z } from 'zod'

export const NewOrderFormSchema = z.object({
  createdAt: z.string(),

  orderNumber: z.string().min(1, 'O número do pedido é obrigatório'),

  customerName: z.string().min(1, 'O nome do cliente é obrigatório'),

  totalValue: z.string().min(1, 'O valor do pedido é obrigatório'),

  commissionPorcentage: z.string().min(1, 'A comissão é obrigatória'),
})

export type NewOrderSchema = z.infer<typeof NewOrderFormSchema>
