"use client";

import { Separator } from "@/components/ui/separator";
import { useSearchQueries } from "@/hooks/useSearchQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {notFound, useParams } from "next/navigation";
import ReviewsService from "@/services/reviews.service";
import ReviewItem from "@/components/widgets/ReviewItem";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MyButton } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import useSearchQueriesFunctions from "@/hooks/useSearchQueriesFunctions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as zod from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {Skeleton} from "@/components/ui/skeleton";

const AMOUNT_OF_ITEMS_TO_SEE_IN_REVIEWS_PAGE = 10;

const schema = zod.object({
  name: zod.string().min(1),
  surname: zod.string().min(1),
  text: zod.string().min(1),
});

type Schema = zod.infer<typeof schema>;

function ReviewsPage() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { page, order } = useSearchQueries();
  const { appendSearchQuery } = useSearchQueriesFunctions();
  const { id: param } = useParams();

  const query = useQuery({
    queryKey: ["reviews", param, page],
    queryFn: () =>
      ReviewsService.getManyOfProduct({
        limit: AMOUNT_OF_ITEMS_TO_SEE_IN_REVIEWS_PAGE,
        page: page,
        productId: param as string,
        order: order,
      }),
    select: (data) => data.data,
  });

  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: ReviewsService.create,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["reviews", param, page],
      });
    },
    onError: () => {
      toast.error("Упс! Щось сталося не так!");
    },
  });

  if (query.isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 auto-rows-auto gap-4">
        <Skeleton className="h-[600px] col-span-2"/>
        <Skeleton className="h-[400px] col-span-1"/>
      </div>
    );
  }

  if (query.isError || !query.data) {
    return notFound();
  }

  const onSubmit: SubmitHandler<Required<Schema>> = (data) => {
    mutation.mutate({
      ...data,
      productId: param as string
    });
  };

  return (
    <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4 items-start">
      <div className="flex flex-col gap-y-4 shrink-0 w-full lg:w-2/3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Коментарі</h1>
          <Select onValueChange={(value) => appendSearchQuery({ sort: value as "asc" | "desc" })}>
            <SelectTrigger className="w-[24ch] sm:w-[220px]">
              <SelectValue placeholder="Сортування" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="asc">Від старих до нових</SelectItem>
                <SelectItem value="desc">Від нових до старих</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Separator />
        <ul className="flex flex-col gap-y-8">
          {query.data.data.map((item) => (
            <ReviewItem key={item.id} data={item} />
          ))}
        </ul>
        <Pagination>
          <PaginationContent>
            {[...Array(Math.ceil(query.data.meta.pagination.total / AMOUNT_OF_ITEMS_TO_SEE_IN_REVIEWS_PAGE))].map(
              (_, idx) => (
                <PaginationItem key={idx} onClick={() => appendSearchQuery({ page: idx + 1 })}>
                  <PaginationLink>{idx + 1}</PaginationLink>
                </PaginationItem>
              )
            )}
          </PaginationContent>
        </Pagination>
      </div>
      <form className="flex flex-col gap-y-4 shrink-0 w-full lg:w-1/3 shadow p-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-x-4">
          <Controller
            control={form.control}
            name="surname"
            render={({ field }) => <Input {...field} required placeholder="Прізвище" />}
          />
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => <Input {...field} required placeholder="Ім'я" />}
          />
        </div>
        <Controller
          control={form.control}
          name="text"
          render={({ field }) => <Textarea {...field} maxLength={512} required rows={12} placeholder="Коментар" />}
        />
        <MyButton type="submit" className="bg-green-700 hover:bg-green-800">
          Створити
        </MyButton>
      </form>
    </div>
  );
}

export default ReviewsPage;
