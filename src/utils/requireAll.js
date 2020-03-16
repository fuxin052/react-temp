import { camelCase } from 'lodash'

export default (requireFiles, handler) => {
  const files = requireFiles.keys().reduce((total, path) => {
    const file = requireFiles(path)

    if (typeof handler === 'function') {
      handler(total, file, path)
    } else {
      const name = camelCase(path.replace(/(\.\/|\.js)/g, ''))

      total[name] = file.default || file
    }

    return total
  }, {})

  return files
}
