"use client"
import Link from "next/link";
import {BiNews} from "react-icons/bi";
import {Button} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import NewsService from "@/services/news.service";
import { NewsItem } from "@/components/widgets/NewsItem";

function NewsBlock() {

  const newsQuery = useQuery({
    queryKey: ["news"],
    queryFn: () => NewsService.getMany({limit: 3}),
    select: (data) => data.data.data,
  })

  if (newsQuery.isLoading) {
    return null
  }

  if (newsQuery.isError || !newsQuery.data) {
    return null
  }

  return (
    <section className="flex flex-col gap-y-8 mb-24">
      <div className="text-4xl">
        Наші останні новини
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
        {newsQuery.data.map((data, index) => (
          <NewsItem key={index} data={data}/>
        ))}
      </div>
      <div>
        <Link href="/news">
          <Button variant="contained" color="secondary" className="p-4 rounded normal-case" endIcon={<BiNews/>}>
            Переглянути всі новини
          </Button>
        </Link>
      </div>
    </section>
  )
}




export default NewsBlock;