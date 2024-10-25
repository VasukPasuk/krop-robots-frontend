import MarkdownView from "react-showdown";

import "./style.scss"
import formatDate from "@/features/formatDate";
import {getOnePost} from "@/actions";
import {ApiResponseMultiple, ApiResponseSingle} from "@/types/api-response.type";
import {INewsItem} from "@/types";

async function Page({params}: { params: { id: string } }) {
  const data = await getOnePost(params.id);
  const {id, attributes} = ((await data.json() ) as ApiResponseSingle<INewsItem>).data ;

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