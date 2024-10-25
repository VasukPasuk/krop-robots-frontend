'use client';

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {useQuery} from '@tanstack/react-query';
import MembersService from '@/services/members.service';
import getImageSrc from '@/features/getImageSrc';
import {Skeleton} from "@/components/ui/skeleton";

const INTERVAL_LENGTH = 10000;

interface Member {
  id: number;
  name: string;
  surname: string;
  occupation: string;
  quote: string;
  avatar: {
    url: string;
  };
}

function MembersBlock() {
  const [currentMember, setCurrentMember] = useState<number>(1);
  const [length, setLength] = useState<number>(1);

  const bulletHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentMember(Number(e.currentTarget.dataset?.bulletNumber));
  };

  const {isLoading, isError, data} = useQuery({
    queryKey: ['members'],
    queryFn: () => MembersService.getMany(),
    select: (data) => data.data,
  });


  useEffect(() => {
    const swiperInterval = setInterval(() => {
      setCurrentMember((prev) => (prev >= length ? 1 : prev + 1));
    }, INTERVAL_LENGTH);

    return () => {
      clearInterval(swiperInterval);
    };
  }, [length]);

  useEffect(() => {
    if (data) {
      setLength(data.data.length);
    }
  }, [data]);

  if (isLoading) return (
    <div className="flex w-full gap-x-4 px-4 justify-center items-center overflow-x-hidden">
      <Skeleton className="shrink-0 w-64 h-64"/>
      <Skeleton className="shrink-0 w-64 h-64"/>
      <Skeleton className="shrink-0 w-64 h-64"/>
      <Skeleton className="shrink-0 w-64 h-64"/>
      <Skeleton className="shrink-0 w-64 h-64"/>
    </div>
  )
  if (isError || !data) return <div>Error loading members</div>;

  const members = data.data;

  return (
    <div className="flex w-full bg-black">
      <div className="flex flex-col items-center justify-center w-full min-h-96 relative">
        <div className="w-full h-full absolute top-0 left-0">
          <Image src="/main-image.jpg" alt="Background Image" fill className="object-cover"/>
        </div>
        <div className="bg-black/70 w-full h-full absolute"/>
        <div className="w-full h-full flex flex-row relative overflow-hidden">
          <ul
            className="flex transition-transform duration-500 ease-in-out w-full relative"
            style={{
              transform: `translateX(-${(currentMember - 1) * 100}%)`,
            }}
          >
            {members.map((member) => (
              <li
                key={member.id}
                className="shrink-0 flex flex-col items-center justify-center w-full text-gray-200 py-12"
              >

               <div className="w-64 h-96 relative rounded overflow-hidden border-8 border-gray-400/25">
                 <Image src={getImageSrc(member.attributes.avatar.data.attributes.url)} alt={member.attributes.name} fill/>
               </div>

                <h1 className="text-center text-wrap text-2xl font-semibold">
                  {member.attributes.name} {member.attributes.surname}
                </h1>
                <h2 className="text-center text-wrap text-xl">{member.attributes.occupation}</h2>
                <h3 className="text-center text-wrap font-light flex items-center justify-center max-w-[96ch]">
                  {member.attributes.quote}
                </h3>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center gap-2 my-4 z-50">
          {Array.from({length}).map((_, index) => (
            <button
              key={index}
              data-bullet-number={index + 1}
              onClick={bulletHandler}
              className={`w-2 h-2 rounded-full ${
                currentMember === index + 1 ? 'bg-white' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MembersBlock;
