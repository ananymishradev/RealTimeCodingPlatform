"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, Code } from "lucide-react"

const codeTemplates = {
  "Array Manipulation": {
    python: `def two_sum(nums, target):
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []`,
    javascript: `function twoSum(nums, target) {
    const hashMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (hashMap.has(complement)) {
            return [hashMap.get(complement), i];
        }
        hashMap.set(nums[i], i);
    }
    return [];
}`,
    java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> hashMap = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (hashMap.containsKey(complement)) {
            return new int[]{hashMap.get(complement), i};
        }
        hashMap.put(nums[i], i);
    }
    return new int[]{};
}`,
  },
  "Binary Tree": {
    python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root):
    result = []
    def inorder(node):
        if node:
            inorder(node.left)
            result.append(node.val)
            inorder(node.right)
    inorder(root)
    return result`,
    javascript: `class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

function inorderTraversal(root) {
    const result = [];
    function inorder(node) {
        if (node) {
            inorder(node.left);
            result.push(node.val);
            inorder(node.right);
        }
    }
    inorder(root);
    return result;
}`,
    java: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    inorder(root, result);
    return result;
}

private void inorder(TreeNode node, List<Integer> result) {
    if (node != null) {
        inorder(node.left, result);
        result.add(node.val);
        inorder(node.right, result);
    }
}`,
  },
}

export function CodeTemplates() {
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Code Templates</h1>
        <p className="text-muted-foreground">Common patterns and templates to help you get started</p>
      </div>

      <div className="space-y-8">
        {Object.entries(codeTemplates).map(([category, languages]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>{category}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(languages).map(([language, code]) => (
                  <Card key={language} className="bg-muted/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{language}</Badge>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(code)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-48">
                        <pre className="text-xs font-mono whitespace-pre-wrap">{code}</pre>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
