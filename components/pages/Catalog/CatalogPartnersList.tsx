"use client"

import {useQuery} from "@tanstack/react-query";
import PartnersService from "@/services/partners.service";
import Link from "next/link";
import getImageSrc from "@/features/getImageSrc";
import Image from "next/image";
import {IImage} from "@/types/image.type";
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";

function CatalogPartnersList() {
  const partnersQuery = useQuery({
    queryKey: ['partners'],
    queryFn: () => PartnersService.getManyShopPartners(),
    select: (data) => data.data.data,
  })

  if (partnersQuery.isLoading) {
    return (
      <div className="items-center overflow-x-auto max-w-[1400px] mx-auto w-full  flex flex-col sm:flex-row justify-start gap-4">
        <Skeleton className="w-96 h-48"/>
        <Skeleton className="w-96 h-48"/>
        <Skeleton className="w-96 h-48"/>
      </div>
    )
  }

  if (partnersQuery.isError || !partnersQuery.data) {
    return (
      <div>
        Error..
      </div>
    )
  }

  const getLogoWidth = (logo: IImage) => logo.data.attributes.formats.small?.width / 2.75 ;

  return (
    <div className="flex items-center justify-start overflow-x-auto max-w-[1400px] mx-auto w-full">
      <ul className="w-full flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4  sm:h-40">
        {partnersQuery.data.map((partner, i) => (
          <Link
            key={partner.id}
            className={cn(`shrink-0 rounded sm:h-16 flex justify-center items-center relative`, {
              'sm:h-32': i === 1
            })}
            href={`/shop/${partner.attributes.eng_name}`}
          >
            <Image
              src={getImageSrc(partner.attributes.logo.data.attributes.formats.small.url)}
              alt={partner.attributes.logo.data.attributes.alternativeText || `Лого партнера: ${partner.attributes.urk_name}`}
              width={getLogoWidth(partner.attributes.logo)}
              height={150}
              title={partner.attributes.eng_name}
            />
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default CatalogPartnersList;