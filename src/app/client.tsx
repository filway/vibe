'use client'

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Client = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(
    trpc.createAI.queryOptions({ text: 'filway PREFECTCH' })
  )

  return <div>{JSON.stringify(data, null, 2)}</div>
}
