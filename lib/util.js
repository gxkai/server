module.exports = {
  getJsonTree
}
function getJsonTree(data, pid) {
  let itemArr = []
  for (let i = 0; i < data.length; i++) {
    let node = data[i]
    if (node.pid === pid) {
      let children = getJsonTree(data, node.id)
      if (children && children.length > 0) {
        node.children = children
      }
      itemArr.push(node)
    }
  }
  return itemArr
}
