import { useState } from 'react'

import {
  LuHeart,
  LuLoaderCircle,
  LuMinus,
  LuPlus,
  LuShoppingCart,
  LuStar,
  LuStarHalf,
} from 'react-icons/lu'

import { useAddToCart, useAddToWishlist, useRemoveFromWishlist } from '@repo/api'
import { Badge, Button, Swiper } from '@repo/ui'
import { cn } from '@repo/utils'

import ProductReviews from './ProductReviews'

export default function ProductDetails({ product, reviews, wishlist }) {
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState('DESC')

  const { mutate: addToWishlist, isPending: addingToWishlist } = useAddToWishlist()
  const { mutate: removeFromWishlist, isPending: removingFromWishlist } = useRemoveFromWishlist()
  const { mutate: addToCart, isPending: addingToCart } = useAddToCart()

  const isWishlisted = wishlist?.products?.some((p) => p._id === product?._id)
  const isOutOfStock = product?.stock === 0
  const discountPercentage =
    product?.price && product?.discountPrice
      ? Math.ceil((product?.discountPrice / product?.price) * 100)
      : 0

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        <Swiper images={product?.images} showImages isCard>
          <Button
            variant="custom"
            size="md-square"
            className={cn(
              'absolute top-0 right-0 z-10 mt-4 mr-4 rounded-full border-none bg-neutral-50 text-xl text-neutral-500 transition-all hover:text-red-600 dark:hover:text-red-400',
              isWishlisted && 'text-red-600 dark:text-red-400',
            )}
            disabled={addingToWishlist || removingFromWishlist}
            onClick={() =>
              isWishlisted ? removeFromWishlist(product?._id) : addToWishlist(product?._id)
            }
          >
            <LuHeart fill={isWishlisted ? 'currentColor' : 'none'} />
          </Button>
        </Swiper>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            {product?.category && <Badge color="sky">{product?.category}</Badge>}
            {product?.brand && <Badge color="purple">{product?.brand}</Badge>}
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-medium sm:text-3xl">{product?.name}</h2>

            <p className="wrap-anywhere text-neutral-500">{product?.shortDescription}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex gap-1 text-lg font-medium text-neutral-500">
              <LuStar />
              <LuStar />
              <LuStar />
              <LuStar />
              <LuStar />
              <div className="text-accent-600 dark:text-accent-400 absolute top-0 left-0 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const rating = Math.round(product?.averageRating * 2) / 2 || 0

                  if (rating >= i + 1) return <LuStar key={i} fill="currentColor" />

                  if (rating >= i + 0.5) return <LuStarHalf key={i} fill="currentColor" />

                  return
                })}
              </div>
            </div>

            <p className="wrap-anywhere text-neutral-500">{product?.averageRating}</p>
          </div>

          <p className="text-4xl font-bold">
            ${product?.price}
            {product?.discountPrice && (
              <>
                <span className="ml-2 text-lg font-bold text-neutral-500 line-through">
                  {`$${product?.price + product?.discountPrice} `}
                </span>
                <Badge color="emerald" className="ml-2">
                  -{discountPercentage}%
                </Badge>
              </>
            )}
          </p>

          <div>
            {isOutOfStock ? (
              <Badge color="rose">Out of Stock</Badge>
            ) : (
              <Badge color="emerald">
                {product?.stock ? `${product?.stock} In Stock` : 'Out of Stock'}
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="md-square"
              onClick={() => {
                if (quantity === 1) return
                setQuantity((q) => q - 1)
              }}
            >
              <LuMinus />
            </Button>

            <span className="self-center px-2 font-semibold">{quantity}</span>

            <Button
              variant="outline"
              size="md-square"
              onClick={() => {
                setQuantity((q) => q + 1)
              }}
            >
              <LuPlus />
            </Button>

            <Button
              variant={isOutOfStock ? 'disabled' : 'primary'}
              disabled={addingToCart}
              onClick={() =>
                addToCart({
                  productId: product?._id,
                  quantity,
                })
              }
              className={cn('normal-case', isOutOfStock && 'pointer-events-none')}
            >
              {addingToCart ? (
                <LuLoaderCircle className="h-[1.5em] animate-spin" />
              ) : isOutOfStock ? (
                'Out of Stock'
              ) : (
                <>
                  <LuShoppingCart /> Add to Card
                </>
              )}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setTab('DESC')}
              className={cn(
                'border-b-4 border-transparent pb-1 text-lg',
                tab === 'DESC' && 'rounded-b border-neutral-950 bg-neutral-200',
              )}
            >
              Description
            </Button>
            <Button
              variant="ghost"
              onClick={() => setTab('REVIEWS')}
              className={cn(
                'border-b-4 border-transparent pb-1 text-lg',
                tab === 'REVIEWS' && 'rounded-b border-neutral-950 bg-neutral-200',
              )}
            >
              Reviews ({reviews?.length || 0})
            </Button>
          </div>

          <div
            className={cn(
              'grid grid-rows-[0fr] transition-all',
              tab === 'REVIEWS' && 'grid-rows-[1fr]',
            )}
          >
            <div className="overflow-hidden">
              <ProductReviews product={product} reviews={reviews} />
            </div>
          </div>

          <div
            className={cn(
              'grid grid-rows-[0fr] transition-all',
              tab === 'DESC' && 'grid-rows-[1fr]',
            )}
          >
            <div className="overflow-hidden">
              <div className="card p-4 shadow-xs">{product?.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
