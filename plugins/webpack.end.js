const compressing = require('compressing');
const moment = require('moment');
const del = require('del');
let delDist = async (dir) => {
  try {
    await del([dir]);
    console.log('删除'+dir+'成功！！！');
  } catch (e) {
    console.log('删除'+dir+'错误！！！');
  }
}
let zip = async (dir,projectName) => {
  let name = `${projectName}正式站包 ${moment().format('YYYY-MM-DD HH_mm_ss')}.zip`;
  moment();
  compressing.zip.compressDir(dir, name)
  .then(()=>{
    console.log('打包成功！！！');
    delDist(dir);
  }).catch((e)=>{
    console.log(e,'打包错误！！！')
  });
}
let globalDir,globalProjectName;
function EndWebpackPlugin(dir,projectName) {
  globalDir = dir;
  globalProjectName = projectName;
};
EndWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    setTimeout(() => {
      console.log('webpack编译完成！！！');
      zip(globalDir,globalProjectName);
    }, 300);
  });
};
module.exports = EndWebpackPlugin;