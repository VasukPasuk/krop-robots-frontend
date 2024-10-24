"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import PartnersService from "@/services/partners.service";
import getImageSrc from "@/features/getImageSrc";
import {IImage} from "@/types/image.type";
import {Skeleton} from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function PartnersBlock() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["nominals"],
    queryFn: () => PartnersService.getManyNominalPartners(),
    select: (data) => data.data,
  });

  if (isLoading) return (
    <div className="flex w-full gap-x-4 px-4 justify-center items-center overflow-x-hidden">
      <Skeleton className="shrink-0 w-64 h-64"/>
      <Skeleton className="shrink-0 w-64 h-64"/>
      <Skeleton className="shrink-0 w-64 h-64"/>
      <Skeleton className="shrink-0 w-64 h-64"/>
    </div>
  )
  if (isError || !data) {
    return null;
  }

  const partners = data;

  const getLogoWidth = (logo: IImage) => logo.formats.small?.width ;

  return (
    <section className="flex flex-col gap-y-8">
      <h2 className="text-3xl">Наші партнери</h2>
      <div className="flex flex-row gap-x-4 overflow-x-auto">
        <ul className="w-full flex flex-col sm:flex-row justify-start items-center gap-y-2 sm:gap-x-2 flex-wrap">
          {partners.data.map((partner, i) => (
            <li
              key={partner.id}
              className={cn(`rounded shrink-0 sm:h-28 flex justify-center items-center relative`, {
                'sm:h-40': i === 1,
                'sm:h-24': i === 2,
                'sm:h-48': i === 3,
                'sm:h-44': i === 4,
              })}
            >
              <Image
                src={getImageSrc(partner.logo.formats.small.url)}
                alt={partner.logo.alternativeText || `Лого партнера: ${partner.name}`}
                width={getLogoWidth(partner.logo)}
                height={200}
                title={partner.name}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PartnersBlock;

