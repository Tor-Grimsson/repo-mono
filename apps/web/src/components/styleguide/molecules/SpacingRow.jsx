const SpacingRow = ({ token, rem, label }) => {
  const sizeStyle = {
    width: `var(${token})`,
    height: '12px'
  }

  return (
    <div className="flex items-center gap-6 rounded-2xl border borderAbsoluteBlack20 bgAbsoluteWhite px-4 py-3">
      <div className="h-3 rounded-full bgAbsoluteBlack" style={sizeStyle} />
      <div className="flex flex-col text-xs textAbsoluteBlack opacity-70">
        <span className="font-semibold textAbsoluteBlack opacity-100">{label}</span>
        <span>{token}</span>
        <span>{rem}</span>
      </div>
    </div>
  )
}

export default SpacingRow
