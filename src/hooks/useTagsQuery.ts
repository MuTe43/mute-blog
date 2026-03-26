import usePostsQuery from "./usePostsQuery"
import { getAllSelectItemsFromPosts } from "src/libs/utils"

export const useTagsQuery = () => {
  const posts = usePostsQuery()
  const tags = getAllSelectItemsFromPosts("tags", posts)

  return tags
}
