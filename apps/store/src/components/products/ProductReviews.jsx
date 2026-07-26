import { useState } from 'react'

import { LuLoaderCircle, LuStar, LuStarHalf, LuTrash2 } from 'react-icons/lu'

import { useCurrentUser, useDeleteReview, usePostReview } from '@repo/api'
import { Button, FormField } from '@repo/ui'
import { format } from '@repo/utils'
import { useForm } from '@repo/utils/forms'

export default function ProductReviews({ product, reviews }) {
  const [formRating, setFormRating] = useState(0)

  const { mutate: postReview, isPending: postingReview } = usePostReview()
  const { mutate: deleteReview, isPending: deletingReview } = useDeleteReview()
  const { data: user } = useCurrentUser()

  const { register, handleSubmit } = useForm()
  const onSubmit = ({ comment }) => {
    postReview({
      productId: product?._id,
      data: {
        rating: formRating,
        comment,
      },
    })
  }

  const handleDelete = (reviewId) => {
    deleteReview({
      productId: product?._id,
      reviewId,
    })
  }

  console.log(reviews)

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card flex flex-col items-start gap-2 p-4 shadow-xs"
      >
        <h2 className="font-medium">Write a Review</h2>

        <div className="relative flex cursor-pointer gap-1 text-2xl font-medium text-neutral-500">
          {Array.from({ length: 5 }).map((_, i) => {
            const rating = Math.round(formRating * 2) / 2 || 0
            const isChosen = rating === i + 1

            return (
              <LuStar
                key={i}
                onClick={() => {
                  if (isChosen) setFormRating(0)
                  else setFormRating(i + 1)
                }}
              />
            )
          })}
          <div className="text-accent-600 dark:text-accent-400 pointer-events-none absolute top-0 left-0 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const rating = Math.round(formRating * 2) / 2 || 0

              if (rating >= i + 1) return <LuStar key={i} fill="currentColor" />

              if (rating >= i + 0.5) return <LuStarHalf key={i} fill="currentColor" />

              return
            })}
          </div>
        </div>

        <FormField
          name="comment"
          register={register}
          placeholder="Share your thoughts..."
          className="card w-full overflow-visible shadow-xs outline-none"
          parentClassName="w-full"
          type="textarea"
          rows={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
        />

        <Button type="submit" disabled={postingReview}>
          {postingReview ? <LuLoaderCircle className="h-[1.5em] animate-spin" /> : 'Post Review'}
        </Button>
      </form>

      {reviews.map((review) => (
        <div className="card flex gap-4 p-4 shadow-xs">
          <img
            src={review?.user.avatar}
            alt={review?.user.username}
            className="size-8 rounded-full bg-neutral-300 object-cover"
          />

          <div className="flex flex-1 flex-col gap-2">
            <div className="flex justify-between">
              <h2 className="font-medium">{review?.user.username}</h2>

              <div className="flex flex-col items-end gap-1">
                <div className="relative flex gap-1 text-lg font-medium text-neutral-500">
                  <LuStar />
                  <LuStar />
                  <LuStar />
                  <LuStar />
                  <LuStar />
                  <div className="text-accent-600 dark:text-accent-400 absolute top-0 left-0 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const rating = Math.round(review?.rating * 2) / 2 || 0

                      if (rating >= i + 1) return <LuStar key={i} fill="currentColor" />

                      if (rating >= i + 0.5) return <LuStarHalf key={i} fill="currentColor" />

                      return
                    })}
                  </div>
                </div>

                <p className="text-sm text-neutral-500">
                  {format(review?.createdAt, 'MMM d, yyyy')}
                </p>
              </div>
            </div>

            <div className="flex items-end justify-between gap-8">
              <p className="wrap-anywhere text-neutral-500">{review?.comment}</p>

              {review?.user._id === user?._id && (
                <Button
                  variant="ghostDanger"
                  size="sm-square"
                  disabled={deletingReview}
                  onClick={() => handleDelete(review?._id)}
                >
                  {deletingReview ? <LuLoaderCircle className="animate-spin" /> : <LuTrash2 />}
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
