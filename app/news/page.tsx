"use client"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import {useSearchQueries} from "@/hooks/useSearchQueries";
import NewsService from "@/services/news.service";
import {NewsItem} from "@/components/widgets/NewsItem";
import {Skeleton} from "@/components/ui/skeleton";


const LIMIT = 6;

function NewsPage() {
  const {page} = useSearchQueries()
  const newsQuery = useQuery({
    queryFn: () => NewsService.getMany({limit: LIMIT, page: page}),
    queryKey: ['news', page],
    select: (data) => data.data,
  })

  if (newsQuery.isLoading) {
    return (
      <div className="flex flex-col gap-y-2 max-w-[1200px] w-full mx-auto px-2">
        <h1 className="my-6 text-4xl">
          Наші новини
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4 my-6">
          {
            [...Array(LIMIT)].map((_, i) => (
              <Skeleton key={i} className="h-[400px]"/>
            ))
          }
        </div>
      </div>
    )
  }

  if (newsQuery.isError || !newsQuery.data) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-2 max-w-[1200px] w-full mx-auto px-2">
      <h1 className="my-6 text-4xl">
        Наші новини
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4">
        {
          newsQuery.data.data.map((newsItem) => (
            <NewsItem data={newsItem} key={newsItem.attributes.title}/>
          ))
        }
      </div>
      <Pagination>
        <PaginationContent className="my-8">
          {
            [...Array(Math.ceil(newsQuery.data.meta.pagination.total / LIMIT))].map((_, i ) => (
              <PaginationItem>
                <PaginationLink href={`?page=${++i}`} isActive>
                  {i}
                </PaginationLink>
              </PaginationItem>
            ))
          }
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default NewsPage;