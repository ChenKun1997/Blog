export default function SignatureLogo({
  width = 320,
  color = 'currentColor',
}: {
  width?: number
  color?: string
}) {
  return (
    <svg
      width={width}
      viewBox="0 0 800 240"
      xmlns="http://www.w3.org/2000/svg"
      className="signature-logo"
      role="img"
      aria-label="陈坤"
    >
      <text
        x="290"
        y="120"
        textAnchor="middle"
        dominantBaseline="central"
        className="signature-text"
        fill={color}
      >
        陈
      </text>
      <text
        x="510"
        y="120"
        textAnchor="middle"
        dominantBaseline="central"
        className="signature-text"
        fill={color}
      >
        坤
      </text>

      <style>{`
        .signature-text {
          font-family: "Ma Shan Zheng", "STKaiti", "KaiTi", "楷体", "LXGW WenKai", cursive, serif;
          font-size: 180px;
          font-weight: 400;
        }
      `}</style>
    </svg>
  )
}
