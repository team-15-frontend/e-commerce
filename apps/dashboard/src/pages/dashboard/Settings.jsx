import { LuLogOut } from 'react-icons/lu'

import ProfileInfo from '@/components/settings/ProfileInfo'
import SecurityForm from '@/components/settings/SecurityForm'
import Settings from '@/components/settings/Settings'

import { useCurrentUser, useLogout } from '@repo/api'
import { Button, Error, LoadingSpinner } from '@repo/ui'

export default function AdminSettings() {
  const { data: user, isLoading, isError, error } = useCurrentUser()
  const { mutate: logout, isPending: logingout } = useLogout()

  return isLoading ? (
    <div className="flex-center flex-1 py-8">
      <LoadingSpinner className="size-24" />
    </div>
  ) : (
    <div className="flex flex-1 flex-col gap-4">
      <div className="card space-y-2 p-4">
        <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
          settings
        </p>
        <h2 className="text-2xl font-medium sm:text-3xl">Preferences and integrations</h2>
        <p className="text-sm text-neutral-500">
          Theme mode, API credentials, and dashboard preferences are managed here.
        </p>
      </div>

      {isError ? (
        <Error message={error?.message} />
      ) : (
        <>
          <ProfileInfo user={user} />

          <SecurityForm />

          <Settings />

          <div className="card flex flex-col items-start gap-4 p-4">
            <h2 className="text-xl font-bold">Account</h2>

            <Button onClick={() => logout()} disabled={logingout} variant="outlineDanger">
              <LuLogOut />
              Logout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
