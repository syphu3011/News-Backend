// import { marked } from 'marked'; // Import đúng cách

// type LifecycleEvent = {
//   params: {
//     data: {
//       hello?: string;
//       [key: string]: any;
//     };
//   };
// };

export default {
  // async beforeCreate(event: LifecycleEvent) {
  //   const { data } = event.params;
  //   if (data.hello) {
  //     data.hello = await marked.parse(data.hello); // Sử dụng marked.parse() thay vì gọi trực tiếp marked
  //   }
  // },
  // async beforeUpdate(event: LifecycleEvent) {
  //   const { data } = event.params;
  //   if (data.hello) {
  //     data.hello = await marked.parse(data.hello); // Sử dụng marked.parse() cho cập nhật
  //     console.log(data)
  //   }
  // },
  async afterCreate(result) {
    console.log('gọi')
    const liked = await strapi.db.query('api::like-bai-viet.like-bai-viet').findOne({
      select: ['like'],
      where: {
        bai_viet: result.result.id
      }
    })
    if (!liked) {
      // Tạo bản ghi mới trong like_bai_viet
      const likeData = {
        bai_viet: result.result.documentId, // Gán ID bài viết vào trường quan hệ
        like: 0, // Khởi tạo giá trị like
      };

      // Lưu bản ghi vào like_bai_viet
      const likeRecord = await strapi
        .documents("api::like-bai-viet.like-bai-viet")
        .create({
          data: likeData,
          populate: 'bai_viet',
          status: "published",
        });
      // Cập nhật trường quan hệ trong bài viết
      await strapi.documents("api::bai-viet.bai-viet").update({
        documentId: result.documentId,
        data: {
          like_bai_viet: likeRecord.documentId
        },
      });
    }
  }
};
