/** Opt-in checkbox for the email list. Unchecked by default; consent has to be an active choice. */
export function EmailListCheckbox({ id, checked, onChange }: { id: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[14px] leading-[1.5]" style={{ color: '#544D5A' }}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-[3px] h-[18px] w-[18px] flex-none cursor-pointer"
        style={{ accentColor: '#D99A22' }}
      />
      <span>Sign me up for the Empire of Light email list. Occasional updates on new programs, resources, and events. Unsubscribe anytime.</span>
    </label>
  )
}
