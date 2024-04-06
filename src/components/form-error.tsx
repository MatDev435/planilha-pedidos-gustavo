import { OctagonAlert } from 'lucide-react'

interface FormErrorProps {
  message: string | undefined
}

export function FormError({ message }: FormErrorProps) {
  return (
    <p className="flex flex-row items-center gap-2 text-sm text-red-500">
      <OctagonAlert className="size-4" /> {message}
    </p>
  )
}
