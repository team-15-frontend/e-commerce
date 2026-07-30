import { FormField } from '@repo/ui'
import { cn, useTheme } from '@repo/utils'
import { useGTranslate } from '@repo/utils/hooks'

export default function AdminSettings({ className }) {
  const { theme, setTheme } = useTheme()

  useGTranslate()

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="card space-y-2 p-4">
        <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
          settings
        </p>
        <h2 className="text-2xl font-medium sm:text-3xl">Preferences and integrations</h2>
        <p className="text-sm text-neutral-500">
          Theme mode, API credentials, and dashboard preferences are managed here.
        </p>
      </div>

      <div className="card flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold">Settings</h2>

        <div className="gtranslate_wrapper"></div>

        <FormField
          label="appearance"
          type="select"
          options={['system', 'dark', 'light']}
          onChange={(e) => setTheme(e.target.value)}
          value={theme}
        />
      </div>
    </div>
  )
}
