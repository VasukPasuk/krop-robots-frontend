"use client"
import {MyButton} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {useQueries} from "@tanstack/react-query";
import CategoriesService from "@/services/categories.service";
import TagsService from "@/services/tags.service";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {ChangeEvent, useState} from "react";
import {CheckedState} from "@radix-ui/react-checkbox";
import useSearchQueriesFunctions from "@/hooks/useSearchQueriesFunctions";
import {Skeleton} from "@/components/ui/skeleton";


type OptionsType = {
  categories: string[]
  tags: string[]
  min: number | null
  max: number | null
}

function CatalogFilter() {
  const [options, setOptions] = useState<OptionsType>({
    categories: [],
    tags: [],
    min: null,
    max: null
  })

  const {appendSearchQuery, resetSearchQuery} = useSearchQueriesFunctions()

  const handleCategories = (checked: CheckedState, value: string) => {
    if (checked) {
      setOptions(prev => ({
        ...prev,
        categories: [...prev.categories, value]
      }))
    } else {
      setOptions(prev => ({
        ...prev,
        categories: prev.categories.filter((category) => category !== value)
      }))
    }
  }

  const handleTags = (checked: CheckedState, value: string) => {
    if (checked) {
      setOptions(prev => ({
        ...prev,
        tags: [...prev.tags, value]
      }))
    } else {
      setOptions(prev => ({
        ...prev,
        tags: prev.tags.filter((category) => category !== value)
      }))
    }
  }

  const handleMin = (e: ChangeEvent<HTMLInputElement>) => {
    setOptions(prev => ({
      ...prev,
      min: Number(e.target.value)
    }))
  }

  const handleMax = (e: ChangeEvent<HTMLInputElement>) => {
    setOptions(prev => ({
      ...prev,
      max: Number(e.target.value)
    }))
  }

  const handleFilter = () => {
    appendSearchQuery({
      categories: options.categories,
      tags: options.tags,
      max: options.max ? options.max : null,
      min: options.min ? options.min : null,
    })
  }


  const [categoriesQuery, tagsQuery] = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => CategoriesService.getMany(),
      },
      {
        queryKey: ["tags"],
        queryFn: () => TagsService.getMany(),
      },
    ]
  })


  if (categoriesQuery.isLoading || tagsQuery.isLoading) {
    return (
      <div className="flex flex-col gap-y-4">
        <Skeleton className="w-full h-48"/>
        <Skeleton className="w-full h-16"/>
        <Skeleton className="w-full h-24"/>
      </div>
    )
  }

  if (
    (categoriesQuery.isError || !categoriesQuery.data) ||
    (tagsQuery.isError || !tagsQuery.data)
  ) {
    return (
      <div>
        isError
      </div>
    )
  }

  const categories = categoriesQuery.data.data
  const tags = tagsQuery.data.data


  return (
    <aside className="flex flex-col gap-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl">Фільтри</h2>
        <MyButton
          variant="destructive"
          size="sm"
          onClick={() => resetSearchQuery()}
        >
          Очистити
        </MyButton>
      </div>
      <div className="flex flex-col gap-y-4">
        <Separator/>

        <FilterItem title="Категорії">
          {
            categories.data.map((category) => (
              <div className="flex items-center justify-start gap-x-2">
                <Checkbox id={category.documentId} value={category.name}
                          onCheckedChange={(checked) => handleCategories(checked, category.name)}/>
                <label
                  htmlFor={category.documentId}
                >
                  {category.name}
                </label>
              </div>
            ))
          }
        </FilterItem>
        <FilterItem title="Теги">
          {
            tags.data.map((tag) => (
              <div className="flex items-center justify-start gap-x-2">
                <Checkbox id={tag.documentId} value={tag.name}
                          onCheckedChange={(checked) => handleTags(checked, tag.name)}/>
                <label
                  htmlFor={tag.documentId}
                >
                  {tag.name}
                </label>
              </div>
            ))
          }
        </FilterItem>
        <FilterItem title="Ціна">
          <Input onChange={handleMin} type="number" placeholder="Мінімальна"/>
          <Input onChange={handleMax} type="number" placeholder="Максимальна"/>
        </FilterItem>
      </div>
      <div>
        <MyButton
          className="bg-green-800 hover:bg-green-700 w-full"
          onClick={handleFilter}
        >
          Застосувати
        </MyButton>
      </div>
    </aside>
  )
}

const FilterItem = ({children, title}: { children: React.ReactNode, title: string }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="text-lg font-light">
        {title}
      </div>
      <div className="pl-4 flex flex-col gap-y-2">
        {children}
      </div>
    </div>
  )
}


export default CatalogFilter;