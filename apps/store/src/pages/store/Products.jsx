import { useState } from 'react'

import { LuListFilter, LuSearch } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'

import ActiveFilters from '@/components/products/ActiveFilters'
import FiltersForm from '@/components/products/FiltersForm'
import ProductCard from '@/components/products/ProductCard'

import { useSearchProducts } from '@repo/api'
import { Button, Dialog, Error, FormField, Pagination } from '@repo/ui'
import { useSearchParamsForm } from '@repo/utils/forms'

const EMPTY_ARRAY = []

export default function Products() {
  const [filters, setFilters] = useState(false)

  const { register, setValue, urlValues } = useSearchParamsForm({
    mode: 'onTouched',
  })
  const { search, category, minprice, maxprice, sort } = urlValues

  const [searchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || 1
  const limit = 8

  const sortParam =
    sort === 'price: low to high'
      ? 'price_asc'
      : sort === 'price: high to low'
        ? 'price_desc'
        : sort === 'newest'
          ? '-oldest'
          : sort === 'popular'
            ? 'rating'
            : 'popular'

  const params = {
    search,
    category,
    minPrice: minprice,
    maxPrice: maxprice,
    sort: sortParam,
    limit,
    page: currentPage,
  }
  const { data, isLoading, isError, error } = useSearchProducts(params)
  const products = data?.products || EMPTY_ARRAY
  const totalPages = data?.totalPages

  return (
    <div className="flex flex-1 flex-col gap-4 py-8">
      <div className="card flex flex-col gap-4 p-4">
        <div className="flex gap-4">
          <FormField
            name="search"
            icon={<LuSearch />}
            placeholder="Search products..."
            register={register}
            parentClassName="w-full"
          />

          <Button
            variant="outline"
            size="lg-square"
            onClick={() => setFilters(!filters)}
            className="lg:hidden"
          >
            <LuListFilter />
          </Button>
        </div>

        <ActiveFilters urlValues={urlValues} setValue={setValue} />
      </div>

      <div className="flex flex-1 gap-4">
        <FiltersForm className="self-start max-lg:hidden" />

        <div className="flex flex-1 flex-col gap-4">
          {isError ? (
            <Error message={error?.message} />
          ) : !products?.length && !isLoading ? (
            <Error message="No products found" />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: isLoading ? limit : products?.length }).map((_, i) => {
                const product = products?.[i]

                return <ProductCard key={i} isLoading={isLoading} product={product} />
              })}
            </div>
          )}

          <Pagination totalPages={totalPages} />
        </div>
      </div>

      <Dialog isOpen={filters} setIsOpen={setFilters} title="Filters" position="right">
        <FiltersForm />
      </Dialog>
    </div>
  )
}
