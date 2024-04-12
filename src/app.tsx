import { CommissionCard } from './components/commission-card'
import { RevenueCard } from './components/revenue-card'
import { ThemeProvider } from './components/theme/theme-provider'
import { ThemeToggle } from './components/theme/theme-toggle'
import { Button } from './components/ui/button'
import { PlusCircle } from 'lucide-react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table'
import { OrderTableRow } from './components/order-table-row'
import { useEffect, useState } from 'react'
import { NewOrderDialogContent } from './components/new-order-dialog-content'
import { Dialog, DialogTrigger } from './components/ui/dialog'
import { Input } from './components/ui/input'

export interface Order {
  id: number
  createdAt: Date
  orderNumber: string
  customerName: string
  totalValue: number
  commissionPorcentage: number
  commission: number
}

export function App() {
  const [orderNumber, setOrderNumber] = useState('')
  const [customerName, setCustomerName] = useState('')

  const [orders, setOrders] = useState<Order[]>([])

  function createNewOrder(order: Order) {
    setOrders((state) => {
      const newState = [order, ...state]

      localStorage.setItem('planilha-pedidos-gustavo', JSON.stringify(newState))

      return newState
    })
  }

  function deleteOrder(orderId: number) {
    const filteredOrders = orders.filter((order) => order.id !== orderId)

    setOrders(() => {
      const newState = filteredOrders

      localStorage.setItem('planilha-pedidos-gustavo', JSON.stringify(newState))

      return newState
    })
  }

  useEffect(() => {
    const storagedOrders = localStorage.getItem('planilha-pedidos-gustavo')

    if (storagedOrders) {
      setOrders(JSON.parse(storagedOrders))
    }
  }, [])

  function getFilteredOrders() {
    return orders.filter(
      (order) =>
        order.orderNumber.includes(orderNumber) &&
        order.customerName.toLowerCase().includes(customerName.toLowerCase()),
    )
  }

  const filteredOrders = getFilteredOrders()
  console.log(filteredOrders)

  const revenue = filteredOrders.reduce(
    (total, order) => total + order.totalValue,
    0,
  )
  const commission = filteredOrders.reduce(
    (total, order) => total + order.commission,
    0,
  )

  return (
    <ThemeProvider storageKey="orders-data-theme" defaultTheme="system">
      <div className="w-full h-full mx-auto lg:max-w-[1000px]">
        <header className="flex items-center p-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Gustavo</h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Dialog>
              <DialogTrigger asChild>
                <Button className="text-sm font-bold gap-2">
                  <PlusCircle className="size-4" /> Novo
                </Button>
              </DialogTrigger>

              <NewOrderDialogContent createOrder={createNewOrder} />
            </Dialog>
          </div>
        </header>
        <section className="grid grid-cols-1 gap-4 px-4 mb-4 md:grid-cols-2">
          <RevenueCard revenue={revenue} ordersAmount={orders.length} />
          <CommissionCard commission={commission} />
        </section>

        <div className="p-4 mb-4">
          <span className="text-lg text-foreground">Filtros</span>

          <div className="text-md grid grid-cols-2 gap-4 mt-4">
            <Input
              placeholder="Número do pedido"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />

            <Input
              placeholder="Nome do cliente"
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="text-muted-foreground text-xl">
              <TableHead className="w-4"></TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>%</TableHead>
              <TableHead>Comissão</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredOrders ? (
              filteredOrders.map((order) => {
                return (
                  <OrderTableRow
                    key={order.id}
                    order={order}
                    deleteOrder={deleteOrder}
                  />
                )
              })
            ) : (
              <p>Nenhum pedido</p>
            )}
          </TableBody>
        </Table>
      </div>
    </ThemeProvider>
  )
}
