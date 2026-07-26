import { useEffect, useState } from 'react'

import { LuClipboardList, LuHouse, LuLogOut, LuMenu, LuPackage, LuX } from 'react-icons/lu'
import { Link, useLocation } from 'react-router-dom'

import { useLogout } from '@repo/api'
import { Button } from '@repo/ui'
import { cn } from '@repo/utils'

const sidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <LuHouse />,
  },
  {
    title: 'Shop',
    path: '/products',
    icon: <LuPackage />,
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: <LuClipboardList />,
  },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const { mutate: logout, isPending: logingout } = useLogout()
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <Button onClick={() => setOpen(!open)} variant="ghost" size="md-square" className="lg:hidden">
        {open ? <LuX /> : <LuMenu />}
      </Button>

      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed inset-0 z-10 cursor-default bg-neutral-50/50 backdrop-blur-sm transition-all lg:hidden',
          open ? 'opacity-100' : 'invisible opacity-0',
        )}
      ></button>

      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-40 flex flex-col gap-2 border-r border-neutral-200 bg-white p-4 shadow transition-all lg:hidden dark:bg-neutral-100 dark:shadow-none',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        {sidebarData.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant={pathname === item.path ? 'primary' : 'ghost'}
              size="lg"
              className="w-full justify-start"
            >
              {item.icon}
              <span className="min-w-36 text-left leading-none">{item.title}</span>
            </Button>
          </Link>
        ))}

        <Button
          onClick={() => logout()}
          disabled={logingout}
          variant="ghostDanger"
          size="lg"
          className="mt-auto justify-start"
        >
          <LuLogOut />
          <span className="min-w-36 text-left leading-none">Logout</span>
        </Button>
      </aside>
    </>
  )
}
