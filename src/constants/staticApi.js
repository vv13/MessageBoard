/*
url:/api/comments
*/
export function getComments() {
  const obj = [];
  for (let i = 0; i < 10; i++) {
    obj.push(Object.assign({
      email: 'zwhvv13@foxmail.com',
      headUrl: '/img/default_head.png',
      date: '16:40, 6/31/2016',
      comment: `留言${i}`,
      discuss: [],
    }));
  }
  for (let i = 0; i < 10; i++) {
    obj[i].discuss.push({
      email: 'zwhvv13@foxmail.com',
      headUrl: '/img/default_head.png',
      date: '16:40, 6/31/2016',
      comment: `回复${i}`,
    });
  }
  console.log(obj);
  return obj;
}
