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
import { zodResolver } from '@hookform/resolvers/zod'
import { Order } from '@/app'
import { formatCurrency } from '@/utils/format-currency'
import { FormError } from './form-error'
import {
  NewOrderFormSchema,
  NewOrderSchema,
} from '@/validations/new-order-form-schema'

interface NewOrderDialogContentProps {
  createOrder: (order: Order) => void
}

export function NewOrderDialogContent({
  createOrder,
}: NewOrderDialogContentProps) {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<NewOrderSchema>({
    resolver: zodResolver(NewOrderFormSchema),
    mode: 'all',
  })

  const totalValue = watch('totalValue')
  const commissionPorcentage = watch('commissionPorcentage')

  const commission =
    (parseFloat(
      String(totalValue).includes(',')
        ? totalValue.replace(',', '.')
        : totalValue,
    ) *
      parseFloat(
        String(commissionPorcentage).includes(',')
          ? commissionPorcentage.replace(',', '.')
          : commissionPorcentage,
      )) /
      100 || 0

  async function handleCreateNewOrder(data: NewOrderSchema) {
    const date = new Date(
      new Date(data.createdAt).getTime() +
        new Date(data.createdAt).getTimezoneOffset() * 60000,
    )

    createOrder({
      ...data,
      id: Math.floor(Math.random() * 100),
      createdAt: date,
      orderNumber: data.orderNumber,
      totalValue: Number(String(data.totalValue).replace(',', '.')),
      commissionPorcentage: Number(
        String(data.commissionPorcentage).replace(',', '.'),
      ),
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
          Adicione um novo pedido
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
          {errors.createdAt && <FormError message={errors.createdAt.message} />}

          <Input
            type="number"
            placeholder="Número do pedido"
            {...register('orderNumber')}
          />
          {errors.orderNumber && (
            <FormError message={errors.orderNumber.message} />
          )}

          <Input placeholder="Cliente" {...register('customerName')} />
          {errors.customerName && (
            <FormError message={errors.customerName.message} />
          )}

          <Input type="text" placeholder="Valor" {...register('totalValue')} />
          {errors.totalValue && (
            <FormError message={errors.totalValue.message} />
          )}

          <Input
            type="text"
            placeholder="Comissão (%)"
            {...register('commissionPorcentage')}
          />
          {errors.commissionPorcentage && (
            <FormError message={errors.commissionPorcentage.message} />
          )}

          <p className="text-muted-foreground">
            Comissão: {formatCurrency(commission)}
          </p>
        </div>

        <DialogFooter className="flex flex-row items-center justify-end gap-4 text-bold text-foreground text-xl">
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>

          <DialogClose>
            <Button
              className="disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={!isValid}
            >
              Criar
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
