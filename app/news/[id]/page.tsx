import MarkdownView from "react-showdown";

import "./style.scss"
import formatDate from "@/features/formatDate";
import {getOnePost} from "@/actions";
import {ApiResponseSingle} from "@/types/api-response.type";
import {INewsItem} from "@/types";
import { redirect } from "next/navigation";
import {redirectURL} from "@/features/urls";

async function Page({params}: { params: { id: string } }) {
  const response = await getOnePost(params.id);


  if (!response.ok) redirect(redirectURL.something_is_wrong)

  const {data: {attributes}} = await response.json() as ApiResponseSingle<INewsItem>;

  return (
    <div className="mt-6 flex flex-col w-full max-w-[800px] px-4 mx-auto">
      <div className="flex flex-col mb-6 gap-y-2">
        <h1 className="text-2xl sm:text-4xl  font-bold">
          {
            attributes.title
          }
        </h1>
        <div className="font-light italic">
          {formatDate(attributes.createdAt)}
        </div>
      </div>

      <main id="news-block">
        <MarkdownView
          markdown={attributes.text}
          options={{tables: true, emoji: true,}}
        />
      </main>
    </div>
  )
}

export default Page