import { LuArrowLeft } from 'react-icons/lu'
import { Link, useSearchParams } from 'react-router-dom'

import { useGetMyOrders } from '@repo/api'
import { Badge, Button, Error, Pagination } from '@repo/ui'
import { cn } from '@repo/utils'

import OrderCard from '../../components/orders/OrderCard'

const EMPTY_ARRAY = []

export default function Orders() {
  const [searchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1
  const limit = 8

  const { data, isLoading, isError, error } = useGetMyOrders({
    limit,
    page: currentPage,
  })
  const orders = data?.orders || EMPTY_ARRAY
  const totalPages = data?.totalPages

  console.log(data)

  return (
    <div className="flex flex-1 flex-col gap-4 py-8">
      <div className="card relative flex items-center justify-between gap-4 p-4">
        <div className="from-accent-500/10 pointer-events-none absolute inset-0 bg-linear-to-l via-transparent to-transparent" />

        <div className="flex gap-4">
          <div className="bg-accent-600 dark:bg-accent-400 w-2 rounded-full" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold sm:text-3xl">My Orders</h2>
            <p className="text-sm text-neutral-500">
              {isLoading ? (
                'Loading your orders...'
              ) : (
                <Badge>
                  {data?.total} order{data?.total === 1 ? '' : 's'}
                </Badge>
              )}
            </p>
          </div>
        </div>

        <Link to="/">
          <Button variant="ghost">
            <LuArrowLeft /> Go Back
          </Button>
        </Link>
      </div>

      {isError ? (
        <Error message={error?.message} />
      ) : !data?.total && !isLoading ? (
        <Error
          message="Your have no orders"
          description="Order products and track your orders here."
          link="/products"
          linkMessage="Browse Products"
        />
      ) : (
        <div className="flex flex-1 flex-col gap-4">
          {Array.from({ length: isLoading ? limit : orders?.length }).map((_, i) => {
            const order = orders?.[i]

            return (
              <Link
                key={i}
                to={`/orders/${order?._id}`}
                className={cn('text-inherit', isLoading && 'pointer-events-none')}
              >
                <OrderCard isLoading={isLoading} order={order} />
              </Link>
            )
          })}
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </div>
  )
}
