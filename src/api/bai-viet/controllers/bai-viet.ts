/**
 * bai-viet controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  "api::bai-viet.bai-viet",
  ({ strapi }) => ({
    // Ghi đè hoặc thêm hành vi tùy chỉnh cho controller mặc định
    async find(ctx) {
      const bai_viets = await strapi
        .documents("api::bai-viet.bai-viet")
        .findMany({
          fields: ['id', 'ten_bai_viet', 'tac_gia', 'publishedAt'],
          populate: {
            like_bai_viet: {
              fields: ["like"],
            },
          },
        });
      bai_viets.map(bai_viet => {
        bai_viet['like'] = bai_viet.like_bai_viet.like
        delete bai_viet["like_bai_viet"];
      });
      return bai_viets;
    },
    async findOne(ctx) {
      const bai_viet = await strapi.documents("api::bai-viet.bai-viet").findOne({
        documentId: ctx.params.id,
        populate: {
          like_bai_viet: {
            fields: ['like']
          }
        }
      });
      bai_viet['like'] = bai_viet.like_bai_viet.like
      delete bai_viet['like_bai_viet']
      return bai_viet;
    },
  })
);
