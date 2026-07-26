import { LuChevronRight } from 'react-icons/lu'

import { Badge, Skeleton } from '@repo/ui'
import { format } from '@repo/utils'

const statusColors = {
  pending: 'amber',
  processing: 'sky',
  confirmed: 'teal',
  shipped: 'purple',
  delivered: 'emerald',
  cancelled: 'rose',
}

export default function OrderCard({ isLoading, order }) {
  return (
    <div className="card flex items-center justify-between p-4">
      <div className="flex gap-2">
        {!isLoading ? (
          <img
            src={order?.items[0].image}
            alt={order?.items[0].name}
            className="size-20 rounded-lg bg-neutral-300 object-cover"
          />
        ) : (
          <Skeleton width={80} height={80} />
        )}

        <div>
          {!isLoading ? (
            <div className="flex-center gap-2">
              <h2 className="font-medium uppercase">#{order?._id?.slice(-8)}</h2>

              <Badge color={statusColors[order?.status]}>{order?.status}</Badge>
            </div>
          ) : (
            <Skeleton width={164} />
          )}

          <p className="text-sm text-neutral-500">
            {!isLoading ? format(order?.createdAt, 'MMM d, yyyy') : <Skeleton width="50%" />}
          </p>

          <p className="text-sm text-neutral-600">
            {!isLoading ? (
              `${order?.items.length} item${order?.items.length === 1 ? '' : 's'}`
            ) : (
              <Skeleton width="30%" />
            )}
          </p>
        </div>
      </div>

      <p className="flex-center gap-2 text-lg">
        {!isLoading ? (
          <>
            {order?.totalPrice}
            <LuChevronRight />
          </>
        ) : (
          <Skeleton width={64} />
        )}
      </p>
    </div>
  )
}
