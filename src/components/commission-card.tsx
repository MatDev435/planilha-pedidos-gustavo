import { formatCurrency } from '@/utils/format-currency'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { CircleArrowUp } from 'lucide-react'

interface CommissionProps {
  commission: number
}

export function CommissionCard({ commission }: CommissionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle className="text-base text-muted-foreground">
            Comissão
          </CardTitle>

          <CircleArrowUp className="text-muted-foreground text-base" />
        </div>

        <CardDescription className="text-3xl font-bold text-foreground">
          {formatCurrency(commission)}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
