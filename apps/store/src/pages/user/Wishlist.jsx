import { useState } from 'react'

import { LuTrash2 } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'

import ProductCard from '@/components/products/ProductCard'

import { useClearWishlist, useGetWishlist } from '@repo/api'
import { Badge, Button, ConfirmDialog, Error, Pagination } from '@repo/ui'

const EMPTY_ARRAY = []

export default function Wishlist() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { mutate: clearWishlist, isPending: clearingWishlist } = useClearWishlist()

  const { data, isLoading, isError, error } = useGetWishlist()
  const productsData = data?.wishlist?.products || EMPTY_ARRAY

  const [searchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1
  const limit = 8
  const startIndex = (currentPage - 1) * limit
  const page = productsData.slice(startIndex, startIndex + limit)
  const totalPages = Math.ceil(data?.totalProducts / limit)

  return (
    <div className="flex flex-1 flex-col gap-4 py-8">
      <div className="card relative flex items-center justify-between gap-4 p-4">
        <div className="from-accent-500/10 pointer-events-none absolute inset-0 bg-linear-to-l via-transparent to-transparent" />

        <div className="flex gap-4">
          <div className="bg-accent-600 dark:bg-accent-400 w-2 rounded-full" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold sm:text-3xl">My Wishlist</h2>
            <p className="text-sm text-neutral-500">
              {isLoading ? (
                'Loading your wishlist...'
              ) : (
                <Badge>
                  {data?.totalProducts} saved product{!(data?.totalProducts === 1) && 's'}
                </Badge>
              )}
            </p>
          </div>
        </div>

        <Button
          variant="ghostDanger"
          onClick={() => setIsDialogOpen(true)}
          disabled={!data?.totalProducts || isLoading || clearingWishlist}
        >
          <LuTrash2 /> Clear All
        </Button>
      </div>

      {isError ? (
        <Error message={error?.message} />
      ) : !data?.totalProducts && !isLoading ? (
        <Error
          message="Your wishlist is empty"
          description="
          Save products you love and find them here anytime."
          link="/products"
          linkMessage="Browse Products"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: isLoading ? limit : page?.length }).map((_, i) => {
            const product = page?.[i]

            return <ProductCard key={i} isLoading={isLoading} product={product} />
          })}
        </div>
      )}

      <Pagination totalPages={totalPages} />

      <ConfirmDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onConfirm={() =>
          clearWishlist(
            {},
            {
              onSuccess: () => {
                setIsDialogOpen(false)
              },
            },
          )
        }
        isLoading={clearingWishlist}
        title="Clear Wishlist"
        message="Are you sure you want to remove all products from your wishlist? This action cannot be undone."
      />
    </div>
  )
}
