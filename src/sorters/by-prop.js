export default function propSort(allFiles, propName, order) {
  let folders = []
  let files = []

  for (let fileIndex = 0; fileIndex < allFiles.length; fileIndex++) {
    const file = allFiles[fileIndex]
    const keyFolders = (file.newKey || file.key).split('/')
    if (file.children) {
      if (!file.name) {
        file.name = keyFolders[keyFolders.length - 2]
      }
      folders.push(file)
    } else {
      if (!file.name) {
        file.name = keyFolders[keyFolders.length - 1]
      }
      files.push(file)
    }
  }

  files = files.sort((a, b) => {
    if (order === 'asc') {
      if (a[propName] > b[propName]) return 1
      if (a[propName] < b[propName]) return -1
      return 0
    }
    if (order === 'desc') {
      if (a[propName] > b[propName]) return -1
      if (a[propName] < b[propName]) return 1
      return 0
    }
  })
  folders = folders.sort((a, b) => {
    if (order === 'asc') {
      if (a[propName] > b[propName]) return 1
      if (a[propName] < b[propName]) return -1
      return 0
    }
    if (order === 'desc') {
      if (a[propName] > b[propName]) return -1
      if (a[propName] < b[propName]) return 1
      return 0
    }
  })

  for (let folderIndex = 0; folderIndex < folders.length; folderIndex++) {
    const folder = folders[folderIndex]
    folder.children = propSort(folder.children, propName, order)
  }

  let sortedFiles = []
  sortedFiles = sortedFiles.concat(folders)
  sortedFiles = sortedFiles.concat(files)
  return sortedFiles
}
