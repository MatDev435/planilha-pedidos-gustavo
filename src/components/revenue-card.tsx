import { formatCurrency } from '@/utils/format-currency'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { CircleArrowUp } from 'lucide-react'

interface RevenueProps {
  revenue: number
  ordersAmount: number
}

export function RevenueCard({ revenue, ordersAmount }: RevenueProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle className="text-base text-muted-foreground">
            Receita total
          </CardTitle>

          <CircleArrowUp className="text-muted-foreground text-base" />
        </div>

        <CardDescription className="text-3xl font-bold text-foreground">
          {formatCurrency(revenue)}
        </CardDescription>

        <p className="text-muted-foreground text-lg">{ordersAmount} pedidos</p>
      </CardHeader>
    </Card>
  )
}
