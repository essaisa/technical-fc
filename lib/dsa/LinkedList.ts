class ListNode<T> {
  value: T
  next: ListNode<T> | null = null

  constructor(value: T) {
    this.value = value
  }
}

export class LinkedList<T> {
  private head: ListNode<T> | null = null

  append(value: T) {
    const node = new ListNode(value)

    if (!this.head) {
      this.head = node
      return
    }

    let current = this.head

    while (current.next) {
      current = current.next
    }

    current.next = node
  }

  toArray() {
    const values: T[] = []
    let current = this.head

    while (current) {
      values.push(current.value)
      current = current.next
    }

    return values
  }
}