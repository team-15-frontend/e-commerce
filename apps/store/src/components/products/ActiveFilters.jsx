import { LuX } from 'react-icons/lu'

import { Badge, Button } from '@repo/ui'

export default function ActiveFilters({ urlValues = {}, setValue }) {
  const { search, category, minprice, maxprice, sort } = urlValues

  const filterLabels = {
    search: search ? `search: ${search}` : null,
    category: category ? `category: ${category}` : null,
    minprice: minprice ? `min Price: ${minprice}` : null,
    maxprice: maxprice ? `max Price: ${maxprice}` : null,
    sort: sort ? `sort: ${sort}` : null,
  }

  return (
    (search || category || minprice || maxprice || sort) && (
      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(filterLabels).map(([key, value]) => {
          return (
            value && (
              <Badge key={key} className="inline-flex items-center gap-1">
                {value}
                <button onClick={() => setValue(key, '')} className="cursor-pointer">
                  <LuX />
                </button>
              </Badge>
            )
          )
        })}

        <Button
          variant="ghostDanger"
          size="sm"
          onClick={() => {
            setValue('search', '')
            setValue('category', '')
            setValue('minprice', '')
            setValue('maxprice', '')
            setValue('sort', '')
          }}
          className="rounded-full text-xs normal-case"
        >
          Clear all
        </Button>
      </div>
    )
  )
}
