"use client";
import { useRouter } from "next/navigation";
import qs from "qs";

export type TSortRule = "asc" | "desc";
export type TypeSort = "new" | "rating" | "expensive_cheap" | "cheap_expensive";

export interface ISearchQueries {
  page: number;
  limit: number;
  min: number | null;
  max: number | null;
  categories: string[];
  tags: string[];
  searchByName: string
  partner?:string | null
}

interface ISearchQueriesOption extends Partial<ISearchQueries> {}

function useSearchQueriesFunctions() {
  const router = useRouter();

  /**
   * This function injects new search params into the URL.
   * If the search query already exists, it will change its value.
   */
  const appendSearchQuery = (queriesObject: ISearchQueriesOption) => {
    const currentQueryString = window.location.search.slice(1);
    const currentQueries = qs.parse(currentQueryString, { parseArrays: true });

    const updatedQueries = {
      ...currentQueries,
      ...queriesObject,
    };

    const queryString = qs.stringify(updatedQueries, {
      skipNulls: true,
      allowEmptyArrays: false,
      arrayFormat: "comma",
    });

    const sanitizedQueryString = queryString.replace(/^\?/, "");

    router.replace(`${location.pathname}?${sanitizedQueryString}`);
  };

  /**
   * This function injects new search params into the URL, clearing previous search params.
   */
  const setSearchQuery = (queriesObject: ISearchQueriesOption) => {
    const queryString = qs.stringify(queriesObject, {
      skipNulls: true,
      allowEmptyArrays: false,
      arrayFormat: "comma",
    });

    router.replace(`${location.pathname}?${queryString}`);
  };

  /**
   * This function clears all search params.
   */
  const resetSearchQuery = () => {
    router.replace(location.pathname);
  };

  return {
    appendSearchQuery,
    setSearchQuery,
    resetSearchQuery,
  };
}

export default useSearchQueriesFunctions;
