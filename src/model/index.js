import requireAll from 'src/utils/requireAll';
import { camelCase } from 'lodash';

/*
model只能写在pages 文件夹内的页面文件夹内, 但是不能在pages根目录
  规则为 /src/pages/[modelName]/model.js
  例如  可以为  /src/pages/home/model.js  此时modelName为home
        可以为  /src/pages/about/me/model.js 此时modelName为aboutMe
        不能为  /src/pages/model.js   不能直接写在pages里面

  所有的 modelName 不能重名 但是可以在model内部单独设置 如果不设置就使用上述规则生成
*/
const modelsModelPath = require.context('./models', false, /\.js$/);

const commonModels = requireAll(modelsModelPath, (total, file, path) => {
  const name = camelCase(path.replace(/(\.\/|\.js)/g, ''));
  total[name] = file.default || file;
});

const pagesModelPath = require.context('../pages', true, /(\/)model\.js$/);

const pagesModel = requireAll(pagesModelPath, (total, file, path) => {
  file = file.default || file;
  const name = file.namespace || camelCase(path.replace(/(\.\/|\/model\.js)/g, ''));
  if (process.env.NODE_ENV === 'development' && (commonModels[name] || total[name])) {
    throw new Error(`ModelName "${name}" has used, please change one. check ${require('path').resolve('/src/pages', path)}`);
  }
  total[name] = file;
});
export default Object.assign({}, commonModels, pagesModel);
