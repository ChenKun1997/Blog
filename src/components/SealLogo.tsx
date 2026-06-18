export default function SealLogo({ char = '陈' }: { char?: string }) {
  return (
    <span className="seal" aria-hidden="true">
      {char}
    </span>
  )
}
