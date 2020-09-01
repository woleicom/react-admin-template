export const getList = (data)=>new Promise((resolve)=>{
  let d = [];
  for(let i=(data.size*(data.page-1)+1);i<data.page*data.size;i++){
    d.push( {
      id: i,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    })
  }
  setTimeout(()=>{
    resolve({
      code: 1,
      message: '登录成功',
      data: d,
      total: 200
    });
  },2000)
});
export const addDemo = (data)=>new Promise((resolve)=>{
  setTimeout(()=>{
    resolve({
      code: 1,
      message: '添加成功',
      data: {...data, id: new Date().getTime()},
    });
  },2000)
});