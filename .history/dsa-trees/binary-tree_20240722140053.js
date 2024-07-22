/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth(node = this.root) {
    if (!node) return 0;
    if (!node.left && !node.right) return 1;
    if (!node.left) return this.minDepth(node.right) + 1;
    if (!node.right) return this.minDepth(node.left) + 1;
    return Math.min(this.minDepth(node.left), this.minDepth(node.right)) + 1;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth(node = this.root) {
    if (!node) return 0;
    return Math.max(this.maxDepth(node.left), this.maxDepth(node.right)) + 1;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum(node = this.root) {
    let result = { max: -Infinity };
    function helper(node) {
      if (!node) return 0;
      let leftMax = Math.max(0, helper(node.left));
      let rightMax = Math.max(0, helper(node.right));
      result.max = Math.max(result.max, node.val+ leftMax + rightMax);
      return node.val + Math.max(leftMax, rightMax);
    }
    helper(node);
    return result.max;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound, node = this.root) {
    if (!node) return null;
    let queue = [node];
    let nextLarger = null;

    while (queue.length) {
      let current = queue.shift();
      if (current.val > lowerBound &&(nextLarger === null || current.val < nextLarger)){
        nextLarger = current.val;
      }
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return nextLarger;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if(!this.root) return false;

    function levelParent (node, target, level=0, parent = null) {
      if(!node) return null;
      if (node === target) return {level, parent};
      return(
        levelParent(node.left, target, level +1, node) || levelParent(node.right, target, level+1, node));
      
    }
    const cousins1= levelParent(this.root, node1);
    const cousins2= levelParent(this.root, node2);
    return cousins1 && cousins2 && cousins1.level ===cousins2.level && cousins1.parent !==cousins2.parent;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const values = [];

    function traverse(node){
      if(node){
          values.push(node.val);
          traverse(node.left);
          traverse(node.right);
        } else{
          values.push(null);
        }
      }
      traverse(tree.root);
    return.JSON.stringify(values);
    }
  

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const values=JSON.parse(stringTree);
    let index=0;

    function newTree(){
      if(index>= values.length || values[index]===null) {
        index++;
        return null;
      }
      const node=new BinaryTreeNode(values[index++]);
      node.left=newTree();
      node.right=newTree();
      return node;
    }
    return new BinaryTree(newTree());
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    function helper(node){
      if(!node || node===node1 || node===node2) return node;
      
      const left= helper(node.left);
      const right=helper(node.right);

      if(left && right) return node;
      return left || right;
    }
    return helper(this.root);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
