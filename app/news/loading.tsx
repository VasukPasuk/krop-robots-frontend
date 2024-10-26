import {Skeleton} from "@/components/ui/skeleton";

export default function NewsLoading () {
  return (
    <div className="max-w-[1300px] px-6 w-full flex flex-col gap-y-4 h-screen">
      {[...Array(10)].map((_, i) => (
        <Skeleton key={i} className="w-full h-32 md:h-64" />
      ))}
    </div>
  )
}
