"use client"
import {useQuery} from "@tanstack/react-query";
import ProductsService from "@/services/products.service";
import CatalogCard from "@/components/widgets/CatalogCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import useSearchQueriesFunctions from "@/hooks/useSearchQueriesFunctions";
import {useSearchQueries} from "@/hooks/useSearchQueries";
import Image from "next/image"
import {usePathname} from "next/navigation";
import { useEffect } from "react";
import {Skeleton} from "@/components/ui/skeleton";


function Catalog() {
  const {query, categories, tags, max, min, searchByName} = useSearchQueries()
  const {appendSearchQuery} = useSearchQueriesFunctions();

  const path = usePathname().split("/");

  const partner = path.length >= 3 ? path.pop() : null

  const {isLoading, isError, data, refetch} = useQuery({
    queryKey: ["products", query],
    queryFn: () => ProductsService.getMany({
      min: min || null,
      max: max || null,
      tags: tags,
      categories: categories,
      searchByName: searchByName,
      partner: partner
    }),
    select: (data) => data.data,
  })

  useEffect(() => {
    refetch()
  }, [path]);

  if (isLoading) return (
    <div className="flex flex-col gap-y-4 w-full">
      <div
        className="grid grid-cols-1 s480:grid-cols-2 min-[700px]:grid-cols-3 min-[1150px]:grid-cols-4 min-[1400px]:grid-cols-5 gap-4 auto-rows-[350px] s480:auto-rows-[300px] w-full"
      >
        {
          [...Array(15)].map((_, i) => (
            <Skeleton/>
          ))
        }
      </div>
    </div>
  );

  if (isError || !data) return (
    <div className="w-full h-[75dvh] items-center justify-center flex flex-col">
      <Image src={"/bad-search-filter.png"} alt={"Not found"} width={300} height={300} className="object-cover"/>
      <h2 className="text-2xl font-light text-center">
        Товарів не знайдено
      </h2>
    </div>
  );

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div
        className="grid grid-cols-1 s480:grid-cols-2 min-[700px]:grid-cols-3 min-[1150px]:grid-cols-4 min-[1400px]:grid-cols-5 gap-4 auto-rows-[350px] s480:auto-rows-[300px] w-full">
        {
          data.data.map((product) => (
            <CatalogCard product={product}/>
          ))
        }
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#"/>
            </PaginationItem>
            {
              [...Array(data.meta.pagination.page)].map((_, idx) => (
                <PaginationItem onClick={() => appendSearchQuery({page: idx})}>
                  <PaginationLink>{++idx}</PaginationLink>
                </PaginationItem>
              ))
            }
            <PaginationItem>
              <PaginationNext/>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default Catalog;