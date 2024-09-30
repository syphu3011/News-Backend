import { marked } from 'marked'; // Import đúng cách

type LifecycleEvent = {
  params: {
    data: {
      chi_tiet?: string;
      [key: string]: any;
    };
  };
};

export default {
  async beforeCreate(event: LifecycleEvent) {
    const { data } = event.params;
    if (data.chi_tiet) {
      data.chi_tiet = await marked.parse(data.chi_tiet); // Sử dụng marked.parse() thay vì gọi trực tiếp marked
    }
  },
  async beforeUpdate(event: LifecycleEvent) {
    const { data } = event.params;
    if (data.chi_tiet) {
      data.chi_tiet = await marked.parse(data.chi_tiet); // Sử dụng marked.parse() cho cập nhật
      console.log(data)
    }
  },
};
