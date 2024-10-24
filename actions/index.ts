import qs from "qs";
import * as process from "node:process";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api"

export async function getOnePost(id: string) {
  const searchQuery = qs.stringify({
    populate: ['main_photo', 'tag'],
  })
  return fetch(`${API_URL}/news/${id}?${searchQuery}`)
}