import { useEffect } from 'react'

import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

import { useCurrentUser } from '@repo/api'
import { cn } from '@repo/utils'
import { toast } from '@repo/utils/toasts'

const protectedRoutes = [
  '/profile',
  '/orders',
  '/wishlist',
  '/cart',
  '/payment',
  '/checkout',
  '/order-success',
]

export default function MainLayout() {
  const { data: user, isLoading } = useCurrentUser()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    protectedRoutes.forEach((route) => {
      if (pathname.startsWith(route)) {
        if (isLoading) return
        if (!user) {
          navigate('/login')
          toast.error('Login first to access this page.')
        }
      }
    })
  }, [user, isLoading, navigate, pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className={cn('flex flex-1 flex-col', pathname !== '/' && 'container')}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
