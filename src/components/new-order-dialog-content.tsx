import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from './ui/dialog'
import { Input } from './ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Order } from '@/app'
import { formatCurrency } from '@/utils/format-currency'

interface NewOrderDialogContentProps {
  createOrder: (order: Order) => void
}

const newOrderSchema = z.object({
  createdAt: z.string(),
  orderNumber: z.string(),
  customerName: z.string(),
  totalValue: z.string(),
  commissionPorcentage: z.string(),
})

type NewOrderSchema = z.infer<typeof newOrderSchema>

export function NewOrderDialogContent({
  createOrder,
}: NewOrderDialogContentProps) {
  const { register, watch, handleSubmit, reset } = useForm<NewOrderSchema>({
    resolver: zodResolver(newOrderSchema),
  })

  const totalValue = watch('totalValue')
  const commissionPorcentage = watch('commissionPorcentage')

  const commission =
    (parseFloat(totalValue) * parseFloat(commissionPorcentage)) / 100 || 0

  async function handleCreateNewOrder(data: NewOrderSchema) {
    const date = new Date(
      new Date(data.createdAt).getTime() +
        new Date(data.createdAt).getTimezoneOffset() * 60000,
    )

    createOrder({
      ...data,
      id: Math.floor(Math.random() * 100),
      createdAt: date,
      orderNumber: Number(data.orderNumber),
      totalValue: Number(data.totalValue),
      commissionPorcentage: Number(data.commissionPorcentage),
      commission,
    })

    reset()
  }

  return (
    <DialogContent className="w-full">
      <DialogHeader className="text-left">
        <DialogTitle className="text-foreground text-3xl">
          Novo pedido
        </DialogTitle>

        <DialogDescription className="text-muted-foreground text-lg">
          Adicioe um novo pedido
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateNewOrder)}>
        <div className="flex flex-col gap-5 text-foreground text-xl mb-6">
          <Input
            type="date"
            {...register('createdAt', {
              value: new Date().toISOString().split('T')[0],
            })}
          />

          <Input
            type="number"
            placeholder="Número do pedido"
            {...register('orderNumber')}
          />

          <Input placeholder="Cliente" {...register('customerName')} />

          <Input
            type="number"
            placeholder="Valor"
            {...register('totalValue')}
          />

          <Input
            type="number"
            placeholder="Comissão (%)"
            {...register('commissionPorcentage')}
          />

          <p className="text-muted-foreground">
            Comissão: {formatCurrency(commission)}
          </p>
        </div>

        <DialogFooter className="flex flex-row items-center justify-end gap-4 text-bold text-foreground text-xl">
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button type="submit">Criar</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
