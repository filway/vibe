import { type TreeItem } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a file collection into a tree view compatible format.
 * @param files - Record of file paths to content
 * @returns Tree structure for TreeView component
 *
 * @example
 * Input: {"src/Button.tsx": "...", "README.md": "..."}
 * Output: [["src", "Button.tsx"], "README.md"]
 */
export function convertFilesToTreeItems(files: {
  [path: string]: string
}): TreeItem[] {
  interface TreeNode {
    [key: string]: TreeNode | null
  }

  const tree: TreeNode = {}

  const sortedPaths = Object.keys(files).sort()

  for (const filePath of sortedPaths) {
    const parts = filePath.split('/')
    let current = tree
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]
      if (!current[part]) {
        current[part] = {}
      }
      current = current[part]
    }

    const fileName = parts[parts.length - 1]
    current[fileName] = null
  }

  function convertNode(node: TreeNode, name?: string): TreeItem[] | TreeItem {
    const entries = Object.entries(node)
    if (entries.length === 0) {
      return name || ''
    }

    const children: TreeItem[] = []

    for (const [key, value] of entries) {
      if (value === null) {
        // This is a file
        children.push(key)
      } else {
        // This is a folder
        const subTree = convertNode(value, key)
        if (Array.isArray(subTree)) {
          children.push([key, ...subTree])
        } else {
          children.push([key, subTree])
        }
      }
    }

    return children
  }

  const result = convertNode(tree)
  return Array.isArray(result) ? result : [result]
}
