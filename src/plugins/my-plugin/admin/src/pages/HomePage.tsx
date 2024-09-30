import { Main } from '@strapi/design-system';
import { useState } from 'react';
const HomePage = () => {
  // const { formatMessage } = useIntl();
  const [todoData, setTodoData] = useState([{id:1, name: 'task'}])
  return (
    <Main>
      <h1>Đây là plugin thử nghiệm</h1><br></br>
      <h2>Chúc bạn 1 ngày vui vẻ</h2>
      {todoData.length === 0 ?
      <p>Empty State</p>
      :
      <p>Count and Table</p>}
    </Main>
  );
};

export { HomePage };
