import { Order } from '@/app'
import { TableCell, TableRow } from './ui/table'
import { EllipsisVertical, Trash } from 'lucide-react'
import { formatCurrency } from '@/utils/format-currency'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { formatDate } from '@/utils/format-date'

interface OrderTableRowProps {
  order: Order
  deleteOrder: (orderId: number) => void
}

export function OrderTableRow({ order, deleteOrder }: OrderTableRowProps) {
  function handleDeleteOrder() {
    deleteOrder(order.id)
  }

  return (
    <TableRow className="text-foreground text-lg">
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={handleDeleteOrder}
              className="flex flex-row items-center gap-4 px-4 py-2 text-foreground text-lg"
            >
              <Trash /> Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      <TableCell>{formatDate(new Date(order.createdAt))}</TableCell>

      <TableCell>{order.orderNumber}</TableCell>

      <TableCell>{order.customerName}</TableCell>

      <TableCell>{formatCurrency(order.totalValue)}</TableCell>

      <TableCell>{order.commissionPorcentage}%</TableCell>

      <TableCell>{formatCurrency(order.commission)}</TableCell>
    </TableRow>
  )
}
