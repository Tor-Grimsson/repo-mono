import { useMemo } from 'react'

const ColorSwatch = ({ name, token, foreground, description }) => {
  const style = useMemo(() => ({ backgroundColor: `var(${token})` }), [token])
  const labelStyle = foreground ? { color: `var(${foreground})` } : undefined

  return (
    <div className="flex flex-col gap-3 rounded-2xl border borderAbsoluteBlack20 bgAbsoluteWhite p-4">
      <div className="h-24 w-full rounded-xl" style={style} />
      <div className="space-y-1" style={labelStyle}>
        <div className="kol-label textAbsoluteBlack">
          {name}
        </div>
        <div className="text-xs textAbsoluteBlack opacity-70">token: {token}</div>
        {description ? <p className="text-xs textAbsoluteBlack opacity-60">{description}</p> : null}
      </div>
    </div>
  )
}

export default ColorSwatch
