type PlayerNodeData = {
  id: number
  name: string
  slug: string
  position: string
  age: number
  club: string
  country: string
  image: string | null
}

class BSTNode {
  player: PlayerNodeData
  left: BSTNode | null
  right: BSTNode | null

  constructor(player: PlayerNodeData) {
    this.player = player
    this.left = null
    this.right = null
  }
}

export class PlayerBST {
  root: BSTNode | null = null

  insert(player: PlayerNodeData) {
    const newNode = new BSTNode(player)

    if (!this.root) {
      this.root = newNode
      return
    }

    let current = this.root

    while (true) {
      if (
        player.name.toLowerCase() <
        current.player.name.toLowerCase()
      ) {
        if (!current.left) {
          current.left = newNode
          return
        }

        current = current.left
      } else {
        if (!current.right) {
          current.right = newNode
          return
        }

        current = current.right
      }
    }
  }

  search(query: string) {
    const results: PlayerNodeData[] = []
    const lowercaseQuery = query.toLowerCase()

    function traverse(node: BSTNode | null) {
      if (!node) return

      if (
        node.player.name
          .toLowerCase()
          .includes(lowercaseQuery)
      ) {
        results.push(node.player)
      }

      traverse(node.left)
      traverse(node.right)
    }

    traverse(this.root)

    return results
  }
}