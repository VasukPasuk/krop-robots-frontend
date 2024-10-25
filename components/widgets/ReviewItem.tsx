import {IReview} from "@/types";
import { LuUserCircle } from "react-icons/lu";
import formatDate from "@/features/formatDate";
import {ResponseItem} from "@/types/api-response.type";

function ReviewItem(data: ResponseItem<IReview>) {
  const {name, surname, text, createdAt} = data.attributes;
  return (
    <li className="flex flex-col gap-y-2 justify-start p-4 shadow rounded dark:bg-white/10">
      <div className="flex flex-row justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <LuUserCircle className="text-xl" />
          <span className="text-gray-700 text-sm s420:text-base dark:text-white/80">{name} {surname}</span>
        </div>
        <h5 className="text-xs s420:text-sm  font-light text-gray-600">
          {
            formatDate(createdAt)
          }
        </h5>
      </div>
      <h2>
        {text}
      </h2>
    </li>
  )
}

export default ReviewItem