import { ClonedGTranslate, FormField } from '@repo/ui'
import { useTheme } from '@repo/utils'

export default function AdminSettings() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col gap-4">
      <div className="card flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold">Settings</h2>

        <div className="flex flex-col gap-1 text-start">
          <label className="flex-center w-fit gap-1 text-sm font-medium text-neutral-600 capitalize">
            Language
          </label>
          <ClonedGTranslate />
        </div>

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
