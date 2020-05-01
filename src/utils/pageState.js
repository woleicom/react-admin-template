// const key = $pageState;
//初始化
let list = {};
let storage = {
  clearItem(key){
    delete list[key];
  },
  getItem(key){
    if(list[key]){
      let value = list[key];
      storage.clearItem(key);
      return value;
    }else{
      return void 0;
    }
  },
  setItem(key,value){
    list[key] = value;
  },
  clear(){
    list = {};
  }
};
export const clearPageState = (key)=>{
  storage.clearItem(key);
}
export const setPageState = (key,value)=>{
  storage.setItem(key,value);
}
export const getPageState = (key)=>{
  return storage.getItem(key);
}
export const clearAllPageState = ()=>{
  storage.clear();
}