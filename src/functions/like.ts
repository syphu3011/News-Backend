import {Core} from '@strapi/strapi'
import { error } from 'console';
async function like(strapi: Core.Strapi, postId: string, liked = false) {
  // Tìm bài viết theo ID
  // const article = await strapi.documents("api::bai-viet.bai-viet").findOne({
  //   documentId: postId
  // });

  // if (!article) {
  //   return 0
  // }

  // // Tăng lượt thích
  // const updatedArticle = await strapi.documents("api::bai-viet.bai-viet").update(
  //   {
  //     documentId: postId,
  //     data: {
  //       like: article.like + (liked ? -1 : 1),
  //     },
  //   }
  // );
  // return updatedArticle.like
  try {
    const id = postId;

    // Tìm bài viết theo ID
    const article = await strapi.documents("api::bai-viet.bai-viet").findOne({
      documentId: id,
      populate: ["like_bai_viet"],
    });

    if (!article) {
      return 0
    }

    // Tăng lượt thích
    const updatedLike = await strapi
      .documents("api::like-bai-viet.like-bai-viet")
      .update({
        documentId: article.like_bai_viet.documentId,
        data: {
          like: article.like_bai_viet.like + (liked ? -1 : 1),
        },
        status: "published",
      });

    // Trả về bài viết đã được cập nhật
    return updatedLike.like;
  } catch (error) {
    return 0
  }
  return 0

}
export default like
