"use client";
import {useSearchParams} from 'next/navigation';
import qs from 'qs';

export function useSearchQueries() {
  const searchParams = useSearchParams();

  const query = qs.parse(searchParams.toString(), {parseArrays: true});

  const getQueryParam = (key: string, defaultValue: any) => {
    const value = query[key] as string;
    return value !== undefined ? (value.includes(",") ? value.split(",") : value) : defaultValue;
  };


  return {
    page: Number(getQueryParam("page", 1)),
    limit: Number(getQueryParam("limit", 15)),
    categories: getQueryParam("categories", []),
    tags: getQueryParam("tags", []),
    min: Number(getQueryParam("min", null)),
    max: Number(getQueryParam("max", null)),
    searchByName: getQueryParam("searchByName", ""),
    order: getQueryParam("order", 'asc'),
    query
  };
}
