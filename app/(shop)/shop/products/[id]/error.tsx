'use client'

export default function Error({error}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="w-full flex justify-center items-center h-screen text-neutral-900/75 text-center">
      {error.message}
    </div>
  )
}