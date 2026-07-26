import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import { Link, useLocation, useParams } from 'react-router-dom'

import ProductCard from '@/components/products/ProductCard'
import ProductDetails from '@/components/products/ProductDetails'

import { useGetProductById, useGetProducts, useGetReviews, useGetWishlist } from '@repo/api'
import { Button, Error, LoadingSpinner } from '@repo/ui'

const EMPTY_ARRAY = []

export default function DynamicProduct() {
  const { id } = useParams()
  const location = useLocation()
  const stateProduct = location.state?.product

  const { data, isLoading: isLoadingProduct, isError, error } = useGetProductById(id)
  const product = stateProduct || data?.product

  const { data: reviewsData, isLoading: isLoadingReviews } = useGetReviews(product?._id)
  const reviews = reviewsData?.reviews || EMPTY_ARRAY

  const { data: wishlistData, isLoading: isLoadingWishlist } = useGetWishlist()
  const wishlist = wishlistData?.wishlist || EMPTY_ARRAY

  const limit = 4
  const {
    data: similerProductsData,
    isLoading: similerProductsIsLoading,
    isError: similerProductsIsError,
    error: similerProductsError,
  } = useGetProducts({ category: product?.category, limit })
  const similerProducts = similerProductsData?.products.filter((p) => p._id !== product._id)

  const isLoading =
    isLoadingProduct || isLoadingReviews || isLoadingWishlist || similerProductsIsLoading

  return isLoading ? (
    <div className="flex-center flex-1 py-8">
      <LoadingSpinner className="size-24" />
    </div>
  ) : (
    <div className="flex flex-1 flex-col gap-4 py-8">
      <div className="card relative flex items-center justify-between gap-4 p-4">
        <div className="from-accent-500/10 pointer-events-none absolute inset-0 bg-linear-to-l via-transparent to-transparent" />

        <div className="flex gap-4">
          <div className="bg-accent-600 dark:bg-accent-400 w-2 rounded-full" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold sm:text-3xl">Product Details</h2>
            <p className="text-sm text-neutral-500">
              Product ID:{' '}
              <span className="text-accent-600 dark:text-accent-400 font-medium uppercase">
                #{product?._id.slice(-8)}
              </span>
            </p>
          </div>
        </div>

        <Link to="/products">
          <Button variant="ghost">
            <LuArrowLeft /> Go Back
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-8">
        {isError ? (
          <Error message={error?.message} />
        ) : !product && !isLoading ? (
          <Error message="No products found" />
        ) : (
          <ProductDetails product={product} reviews={reviews} wishlist={wishlist} />
        )}
      </div>

      <div className="flex flex-col gap-8 py-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl font-medium sm:text-4xl">Similer Products</h2>

          <Link to={`/products?category=${product?.category}`} className="text-inherit">
            <Button variant="ghost">
              View All <LuArrowRight />
            </Button>
          </Link>
        </div>

        {similerProductsIsError ? (
          <Error message={similerProductsError?.message} />
        ) : !similerProducts?.length && !similerProductsIsLoading ? (
          <Error message="No products found" />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: isLoading ? limit : similerProducts?.length }).map((_, i) => {
              const product = similerProducts?.[i]

              return <ProductCard key={i} isLoading={similerProductsIsLoading} product={product} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}
