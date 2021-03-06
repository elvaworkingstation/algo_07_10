function groupAnagrams(words) {
    let obj = {}
    let res = [];
    for (let i = 0; i < words.length; i++) {
        if (!obj[words[i].length]) {
            obj[words[i].length] = [words[i]]
        } else {
            obj[words[i].length].push(words[i])
        }
    }
    for (let h in obj) {
        var pattern = obj[h][0].split('').sort().join('');
        var arr = []
        for (var i = 1; i < obj[h].length; i++) {
            var val = obj[h][i];
            if (val.split('').sort().join('') == pattern) {
                arr.push(val);
            }
        }
        res.push(arr);
    }
    return res
}

function largestRange(array) {
    let bestRange = [];
    let longestLength = 0;
    let obj = {}
    for (let n of array) {
        obj[n] = true;
    }

    for (let n of array) {
        if (!obj[n]) continue;
        obj[n] = false;

        let curLength = 1;
        let left = n - 1;
        let right = n + 1;
        while (left in obj) {
            obj[left] = false;
            curLength++;
            left--;
            console.log(left, obj);
        }
        while (right in obj) {
            obj[right] = false;
            curLength++;
            right++;
        }
        if (curLength > longestLength) {
            longestLength = curLength;
            bestRange = [left + 1, right - 1];
        }
    }
    return bestRange;
}

// Apartment Hunting
function apartmentHunting(blocks, reqs) {
  let minFromBlocks = reqs.map(r => getMinDistance(blocks, r))
  let maxAtBloacks = getMaxDistance(blocks, minFromBlocks);
  return getIdxAtMinVal(maxAtBloacks);
}
function getMinDistance(blocks, req){
  let minDistance = new Array(blocks.length);
  let minReqIdx = Infinity;
  for(let i = 0; i < blocks.length; i++){
    if(blocks[i][req]) minReqIdx = i;
    minDistance[i] = Math.abs(i - minReqIdx);
  }
  for(let i = blocks.length - 1; i >= 0; i--){
    if(blocks[i][[req]]) minReqIdx = i;
    minDistance[i] = Math.min(minDistance[i],Math.abs(i - minReqIdx) )
  }
  return minDistance;
}
function getMaxDistance(blocks, minDistance){
  let maxDistanceAtBlocks = new Array(blocks.length);
  for(let i = 0; i < blocks.length; i++){
    let minDisAtBlock = minDistance.map(distances => distances[i]);
    maxDistanceAtBlocks[i] = Math.max(...minDisAtBlock);
  }
  return maxDistanceAtBlocks;
}
function getIdxAtMinVal(arr){
  let idx = 0;
  let minVal = Infinity;
  for(let i = 0; i < arr.length; i++){
    let curVal = arr[i];
    if(curVal < minVal){
	minVal = curVal;
	idx = i;
     }
  }
  return idx;
}

// Flatten Binary Tree
function flattenBinaryTree(root) {
  let inOrderNodes = getNodesInOrder(root,[]);
  for(let i = 0; i < inOrderNodes.length - 1; i++){
    let leftNode = inOrderNodes[i];
    let rightNode = inOrderNodes[i + 1];
    leftNode.right = rightNode;
    rightNode.left = leftNode;
  }
  return inOrderNodes[0]
}
function getNodesInOrder(tree, array){
  if(tree !== null){
		getNodesInOrder(tree.left, array);
    array.push(tree);
    getNodesInOrder(tree.right, array)
	}
  return array;
}

// Iterative In-order Traversal
function iterativeInOrderTraversal(tree, callback) {
  let preNode = null;
  let curNode = tree;
  while(curNode !== null){
    let nextNode;
    if(preNode === null || preNode === curNode.parent){
      if(curNode.left !== null){
        nextNode = curNode.left;
      } else {
        callback(curNode);
        nextNode = curNode.right !== null ? curNode.right : curNode.parent;
      }
    } else if(preNode === curNode.left){
      callback(curNode);
      nextNode = curNode.right !== null ? curNode.right : curNode.parent;
    } else {
      nextNode = curNode.parent;
    }
    preNode = curNode;
    curNode = nextNode;
  }
}

// Water Area
function waterArea(heights) {
  let max = new Array(heights.length).fill(0);
	let leftMax = 0;
	for(let i = 0; i < heights.length; i++){
		let height = heights[i];
		max[i] = leftMax;
		leftMax = Math.max(leftMax, height);
	}
	let rightMax = 0;
	for(let i = heights.length - 1; i >= 0; i--){
		let height = heights[i];
		let minHeight = Math.min(rightMax, max[i]);
		if(height < minHeight){
			max[i] = minHeight - height;
		} else {
			max[i] = 0;
		}
		rightMax = Math.max(rightMax, height);
	}
	return max.reduce((a,b) => a + b, 0)
}

// Accounts Merge
var accountsMerge = function(accounts) {
    const uf = new UnionFind(accounts.length);
    const emails = {};
    const names = {};


    for (let i = 0; i < accounts.length; i++) {
        let acct = accounts[i];
        names[i] = acct[0];

        for (let j = 1; j < acct.length; j++) {
            if (acct[j] in emails) {
                var idx = emails[acct[j]]
                uf.union(idx, i);
            } else {
                emails[acct[j]] = i;
            }
        }
    }

    const disjointSets = {};
    for (let i = 0; i < accounts.length; i++) {
        let acct = accounts[i];
        let parent = uf.find(i);

        if (!disjointSets[parent]) {
            disjointSets[parent] = new Set();
        }

        for (let j = 1; j < acct.length; j++) {
            disjointSets[parent].add(acct[j]);
        }
    }

    const res = [];
    const keys = Object.keys(disjointSets);

    for (let i = 0; i < keys.length; i++) {
        let sortedEmails = [...disjointSets[keys[i]]].sort();
        res.push([names[keys[i]], ...sortedEmails]);
    }

    return res;
};

class UnionFind {
    constructor(size) {
        this.parents = new Array(size);

        for (let i = 0; i < size; i++) {
            this.parents[i] = i;
        }
    }

    find(x) {
        if (this.parents[x] !== x) {
            this.parents[x] = this.find(this.parents[x]);
        }

        return this.parents[x];
    }
    union(a, b) {
        let parentA = this.find(a);
        let parentB = this.find(b);

        if (parentA !== parentB) {
            this.parents[parentA] = parentB;
        }
    }
};

// Longest Polindrom Substring
function longestPalindromicSubstring(string) {
  let curLongest = [0, 1];
	for(let i = 1; i < string.length; i++){
		let odd = getLongestPalindrom(string, i - 1, i + 1);
		let even = getLongestPalindrom(string, i - 1, i);
		let longest = odd[1] - odd[0] > even[1] - even[0] ? odd : even;
		curLongest = curLongest[1] - curLongest[0] > longest[1] - longest[0] ? curLongest : longest;
	}
	return string.slice(curLongest[0], curLongest[1]);
}

function getLongestPalindrom(string, leftIdx, rightIdx){
	while(leftIdx >= 0 && rightIdx < string.length){
		if(string[leftIdx] !== string[rightIdx]) break;
		leftIdx--;
		rightIdx++;
	}
	return [leftIdx + 1, rightIdx];
}

// Balanced Brackets
function balancedBrackets(string) {
  let stack = [];
	let matchBrackets = {')':'(',']':'[','}':'{'};
	for(let i = 0; i < string.length; i++){
		if(matchBrackets[string[i]]){
      if(stack.length == 0) return false;
			if(matchBrackets[string[i]] == stack[stack.length -1]) {
				stack.pop();
			} else {
				return false
			}
		} else if(string[i] == '(' || string[i] == '{' || string[i] == '[' ){
			stack.push(string[i]);
		}
	}
		return stack.length == 0;
}

// Boggle Board
function boggleBoard(board, words) {
  let trie = new Trie3();
	for(let word of words){
		trie.add(word);
	}
	let finalWords = {};
	let visited = board.map(row => row.map(letter => false));
	for(let i = 0; i < board.length; i++){
		for(let j = 0; j < board[i].length; j++){
			if(trie.root[board[i][j]] && visited[i][j] == false){
			explore(i, j, board, trie.root, visited, finalWords);
			}
		}
	}
	return Object.keys(finalWords);
}
function explore(i, j, board, node, visited, finalWords){
	if(visited[i][j]) return;
	let char = board[i][j];
	if(!node[char]) return;
	visited[i][j] = true;
	node = node[char];
	if('*' in node) finalWords[node['*']] = true;
	let neighbors = getNeighbors(i, j, board);
	for(let n of neighbors){
		explore(n[0], n[1], board, node, visited, finalWords);
	}
	visited[i][j] = false;
}

function getNeighbors(i, j, board){
	let neighbors = [];
	if(i > 0 && j > 0) {
		neighbors.push([i - 1, j - 1]);
	}
	if(i > 0 && j < board[0].length - 1){
		neighbors.push([i - 1, j + 1]);
	}
	if(i < board.length - 1 && j < board[0].length - 1){
		neighbors.push([i + 1, j + 1]);
	}
	if(i < board.length - 1 && j > 0){
		neighbors.push([i + 1, j - 1]);
	}
	if(i > 0){
		neighbors.push([i - 1, j])
	}
	if(i < board.length - 1){
		neighbors.push([i + 1, j])
	}
	if(j > 0){
		neighbors.push([i, j - 1])
	}
	if(j < board[0].length - 1){
		neighbors.push([i, j + 1]);
	}
	return neighbors;
}

class Trie3{
	constructor(){
		this.root = {};
		this.endSymbol = "*"
	}
	add(word){
		let cur = this.root;
		for(let char of word){
			if(!cur[char]) cur[char] = {};
			cur = cur[char];
		}
		cur[this.endSymbol] = word;
	}
}

// Reverse string
function reverse(str){
  if(str.length == 1 && str.length ==0) return true;
  let left = 0;
  let right = str.length - 1;
  while(left < right){
    if(str[left] !== str[right]) return false;
    left++;
    right--
  }
  return true;
}

// Find Missing Number between two arrays
function findMissing(arr1, arr2){
  if(arr1.length < arr2.length) return findMissing(arr2, arra1)
  if(arr1.length == 0 && arr2.length ==0) return 'no missing number';
  if(arr1.length == 0 || arr2.length ==1) return arr2[0];
  if(arr1.length == 1 || arr2.length ==0) return arr1[0];
  let obj = {};
  for(let i = 0; i < arr2.length; i++){
    obj[arr2[i]] = i;
  }
  for(let i = 0; i < arr1.length; i++){
    if(!(arr1[i] in obj)) {
      return arr1[i];
    }
  }
  return "no missing number";
}

// Sum to Target
function matchPair(arr, target){
  if(target == 0 ) return "target number is zero";
  if(arr.length < 2) return "array length is less than two"
  let obj = {};
  for(let i = 0; i < arr.length; i++){
    let dif = target - arr[i];
    if(dif in obj && obj[dif] !== i){
      return [dif, arr[i]]
    }
    obj[arr[i]] = i;
  }
  return "No matched pairs";
}

// branch sums
class BianryTree{
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
function branchSums(root) {
  let res = [];
  dfs(root, res, 0)
  return res;
}
function dfs(root,res, sum){
  if(!root) return;
  sum += root.value;
  if(!root.left && !root.right) {
    res.push(sum);
    return;
  }
  dfs(root.left, res, sum)
  dfs(root.right, res, sum)
}


// node Depths
function nodeDepths(root) {
  // let depthSum = dfs(root, 0);
  // return  depthSum;
	return dfs0(root, 0)
}
 function dfs0(node, res){
	if(!node) return 0;
	return res + dfs0(node.left, res + 1) + dfs0(node.right, res + 1)
 }

var maxPathSum1 = function(root) {
  return helper(root)[1];
};

function helper(root) {
  if (!root) {
    return [-Infinity, -Infinity];
  }
  const left = helper(root.left);
  const right = helper(root.right);
  const localMax = root.val + Math.max(left[0], right[0], 0);
  const globalMax = Math.max(root.val + left[0] + right[0], localMax, left[1], right[1]);
  return [localMax, globalMax];
}

//  Right Sibling Tree
function rightSiblingTree(root) {
  mutate(root, null, null);
	return root;
}
function mutate(node, parent, isLeftChild){
	if(node === null) return;
	let {left, right} = node
	mutate(left, node, true);
	if(parent == null){   
		node.right = null;
	} else if(isLeftChild){   
		node.right = parent.right;
	} else {			
		if(parent.right === null){
			node.right = null;
		} else {
			node.right = parent.right.left;
		}
	}
	mutate(right, node, false)
}
// 


//  Min Number of Jumps
function minNumberOfJumps(array) {
  let chainEnd = 0;
	let farthest = 0;
	let jumps = 0;
	for (let i = 0; i < array.length - 1; i++) {
    console.log(i, chainEnd,farthest);
		if (i + array[i] > farthest) farthest = i + array[i];
		if (i === chainEnd) {
			jumps++;
			chainEnd = farthest;
		}
      console.log(i, chainEnd,farthest, jumps);
      console.log();
	}
	return jumps;
}

// Water Area
function waterArea(heights) {
  let max = new Array(heights.length).fill(0);
	let leftMax = 0;
	for(let i = 0; i < heights.length; i++){
		let height = heights[i];
		max[i] = leftMax;
		leftMax = Math.max(leftMax, height);
	}
	let rightMax = 0;
	for(let i = heights.length - 1; i >= 0; i--){
		let height = heights[i];
		let minHeight = Math.min(rightMax, max[i]);
		if(height < minHeight){
			max[i] = minHeight - height;
		} else {
			max[i] = 0;
		}
		rightMax = Math.max(rightMax, height);
	}
	return max.reduce((a,b) => a + b, 0)
}


// island size
function islandsSize(matrix){
  if(matrix.length == 0) return 0;
  let res = [];
  let r = matrix.length, c = matrix[0].length;
  let grid = matrix.slice()
  for(let i = 0; i < r; i++){
    for(let j = 0; j < c; j++){
      if(grid[i][j] == 1){
        res.push( dfs(grid, i,j) );
      }
    }
  }
  return res;
} 
function dfs(grid, i, j){

  if(i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] !== 1) return 0;
  grid[i][j] = 0;
  return 1 + dfs(grid, i - 1, j) + dfs(grid, i + 1, j)
           + dfs(grid, i, j - 1) + dfs(grid, i, j + 1)
           + dfs(grid, i - 1, j - 1) + dfs(grid, i + 1, j + 1)
           + dfs(grid, i + 1, j - 1) + dfs(grid, i - 1, j + 1)
}


// Goat Latin
var toGoatLatin2 = function(S) {   //  this is mine
    let s = S.split(' ');
    for(let i = 0; i < s.length; i++){
        if(!isVowel(s[i])){
            s[i] = s[i].substr(1) + s[i][0];
        }
        s[i] += 'ma'
        for (let j = 0; j <= i; j++) {
                   s[i] += 'a'
               }
    }
    return s.join(' ');
};

function isVowel(word){
    let c = word[0].toLowerCase();
    return (c == "a" ||c == "e" || c == "i"|| c == "o" || c == "u" )
}

// Integer to Roman
var intToRoman11 = function(num) {
    let values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let index = 0;
    let romanNum = "";

    while (num > 0) {
        if (num >= values[index]) {
            num -= values[index];
            romanNum += symbols[index];
        } else index++;
    }
    return romanNum;
};


// Maximum Difference Between Nodes and Ancestor
var maxAncestorDiff = function(root) {
    if (!root) return 0;
    return traverse(root, root.val, root.val)
    
};

var traverse = function(node, min, max){
    if (!node) return max - min
    
    if (node.val < min) min = node.val
    if (node.val > max) max = node.val
    
    let left = traverse(node.left, min, max)
    let right = traverse(node.right, min, max)
    
    return Math.max(left, right)
}


//  Minimum Absolute Difference in BST

var maxAncestorDiff = function(root) {
    if (!root) return 0;
    return traverse(root, root.val, root.val)

};

var traverse = function(node, min, max){
    if (!node) return max - min

    if (node.val < min) min = node.val
    if (node.val > max) max = node.val

    let left = traverse(node.left, min, max)
    let right = traverse(node.right, min, max)

    return Math.max(left, right)
}



//  Sum Root to Leaf Numbers

var sumNumbers = function(root) {
    let result = 0
    dfs(root, "")

    function dfs(root, currentPath){
        if(!root) return
        if(!root.left && !root.right){
            currentPath += root.val
            result += parseInt(currentPath)
            return
        }
        dfs(root.left, currentPath + root.val)
        dfs(root.right, currentPath + root.val)
    }

    return result
};
/////////////////////////////////////////////////////////////////////////////
//  Minimum Absolute Difference in BST

var getMinimumDifference = function(root) {  
    if (!root) return 0;
    let prev = null;
    let min = Infinity;
    var inorder = function(root){
        if (!root) return;
        inorder(root.left);
        if (prev){
            min = Math.min(min, Math.abs(root.val - prev.val));
        }
        prev = root;
        inorder(root.right);
    }
    inorder(root);
    return min;
};


// best time to buy and sell 
var maxProfit = function(prices) {
    let hold = -Infinity, sold = 0, rest = 0;
    for (let i = 0; i < prices.length; i++) {
        let nextHold = Math.max(hold, rest - prices[i]);
        let nextSold = hold + prices[i];
        let nextRest = Math.max(rest, sold);
        hold = nextHold;
        sold = nextSold;
        rest = nextRest;
    }
    return Math.max(sold, rest);
};

// Inorder Successor in BST
var inorderSuccessor = function(root, p) {
  if (p.right !== null) {
    let current = p.right;
    while (current.left !== null) {
      current = current.left
    }
    return current;
  } else {
    let current = root
    let successor = null

    while (current !== null) {
      if (current.val > p.val) {
        successor = current
        current = current.left
      } else if (current.val < p.val) {
        current = current.right
      } else if (current === p) {
        break
      }
    }

    return successor
  }
};
var uniquePaths = function(m, n) {
    let dp = new Array(m).fill(0).map(x => Array(n).fill(0));
    for(let i = 0; i < m; i++){
      dp[i][0] = 1;
    }
    for(let j = 0; j < n; j++){
      dp[0][j] = 1
    }
    for(let i = 1; i < m; i++){
      for(let j =1; j < n; j++){
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
    console.log(dp);
    return dp[m - 1][n - 1];
};



// Unique Paths II

var uniquePathsWithObstacles = function(obstacleGrid) {
    if(!obstacleGrid.length || obstacleGrid[0][0] == 1) return 0;
    let r = obstacleGrid.length;
    let c = obstacleGrid[0].length;
    obstacleGrid[0][0] = 1;
    for(let i = 1; i < r; i++){
      // obstacleGrid[i][0] = (obstacleGrid[i][0] == 0 && obstacleGrid[i - 1][0] == 1) ? 1 : 0;
      if(obstacleGrid[i][0] == 0 && obstacleGrid[i - 1][0] == 1){
        obstacleGrid[i][0] = 1;
      } else obstacleGrid[i][0] = 0;
    }
    for(let j = 1; j < c; j++){
      if(obstacleGrid[0][j] == 0 && obstacleGrid[0][j - 1]){
        obstacleGrid[0][j] = 1;
      } else obstacleGrid[0][j] = 0;
    }
    for(let i = 1; i < r; i++){
      for(let j = 1; j < c; j++){
        if(obstacleGrid[i][j] == 0){
          obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1];
        } else {obstacleGrid[i][j] = 0;}
      }
    }
    console.log(obstacleGrid);
    return obstacleGrid[r - 1][c - 1];
};
  


//  Minimum Path Sum

var minPathSum = function(grid) {
    let m = grid.length, n = grid[0].length;
    for(let i = 1; i < m; ++i) grid[i][0] += grid[i - 1][0];
    for(let j = 1; j < n; ++j) grid[0][j] += grid[0][j - 1];
    console.log(grid);

    for(let i = 1; i < m; ++i){
        for(let j = 1; j < n; ++j){
            grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1]);
        }
    }
    return grid[m-1][n-1];
};


// Unique Paths III
var uniquePathsIII = function(board) {
  let n = board.length;
  let m = board[0].length;
  let count = 0;

  let startX = 0
  let startY = 0;
  let zeroes = 1; 
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < m; y++) {
      if (board[x][y] === 0) zeroes += 1;
      if (board[x][y] === 1) {
        startX = x;
        startY = y;
      }
    }
  }
  const dfs = (x, y, zeroes) => {
    if (x < 0 || x >= n || y < 0 || y >= m || board[x][y] === -1)  return;


    if (board[x][y] === 2) {
      if (zeroes === 0) count += 1;
      return;
    }

    let orig = board[x][y];
    board[x][y] = -1;
    dfs(x + 1, y, zeroes - 1);
    dfs(x - 1, y, zeroes - 1);
    dfs(x, y + 1, zeroes - 1);
    dfs(x, y - 1, zeroes - 1);

    board[x][y] = orig;
  }
  dfs(startX, startY, zeroes);
  return count;
}



// String Without AAA or BBB

var strWithout3a3b = function(A, B) {
    let a = "a", b ='b';
    if(A < B) {
        [A, B] = [B, A];
        [a, b] = [b, a];
    }
    let res = ''
    while(A || B){
        if(A > 0) res += a, A--;
        if(A > B) res += a, A--;
        if(B > 0) res += b, B--;
    }
    return res;
};



// Missing Number
var missingNumber = function(nums) {
  let len = nums.length;
  for(let i = 0; i < nums.length; i++){
    len ^= i ^ nums[i]
  }
  return len;
}


//  Single Number
var singleNumber = function(nums) {
    let n = nums[0];
    for(let i = 1; i < nums.length; i++){
        n ^= nums[i]
    }
    return n
};


//  Find the Duplicate Number
var findDuplicate = function(nums) {
  for(let i = 0; i < nums.length; i++){
    let n = Math.abs(nums[i])
    if(nums[n] < 0) return n;
    nums[n] *= -1
  }
};


// Partition to K Equal Sum Subsets
var canPartitionKSubsets = function(nums, k) {
let sum = nums.reduce((a, v) => a + v);
	if(sum%k!==0) return false;
	let used = Array.from({length:nums.length}, x=>false);
  sum /= k;
	let left = nums.length;
  const search = (start, target) => {
		if(left===0) return true;
		if(target===0) return search(0, sum);
		for(let i=start; i<nums.length; i++){
			if(nums[i]>sum) return false;// any number > sum return false
			if(!used[i] && nums[i]<=target){
				used[i]=true;
				left--;
				if(search(i+1, target-nums[i])) return true;
				used[i]=false;
				left++;
			}
		}
		return false;
	}
	return  search(0, sum);
}



//  Missing Element in Sorted Array
var missingElement = function(nums, k) {
    const missing = (idx, arr) => {
        return arr[idx] - arr[0] - idx;
    }
    let n = nums.length;
    if(k > missing(n - 1, nums)){
        return nums[n - 1] + k - missing(n - 1, nums);
    }
    let left = 0, right = n - 1, pivot;
    while( left != right ){
      pivot = left + (right - left) / 2
      if(missing(pivot, nums) < k) left = pivot + 1;
      else right = pivot;
    }
    console.log(nums[idx - 1] + k, idx,'xx');
    return nums[left - 1] + k - missing(left - 1, nums)
};



// Find All Duplicates in an Array
function findDuplicates4422(nums) {
    let res = [];
    for (let n of nums) {
      let idx = Math.abs(n) - 1;
      if(nums[idx] < 0) res.push(Math.abs(n)) 
      nums[idx] *= -1;
    }
    return res;
}


// Generate Parentheses

var generateParenthesis = function(n) {
  const res = [];
  const generate = (left, right, str) => {
    console.log('left, right', left, right);
    if (left === n && right === n) {
      res.push(str);
      console.log(res);
      return;
    }
    if (left < n) generate(left + 1, right, str+'(');
    if (left > right && right < n) generate(left, right + 1, str+')');
  }
  generate(0, 0, '');

  return res;
};


//. Letter Combinations of a Phone Number
function letterCombinations2(digits) {
  if (digits.length === 0) return [];

  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };

  let res = [];
  function go(i, s) {
    console.log(i, s);
    if (i === digits.length) {
      res.push(s);
      return;
    }
    console.log(map[digits[i]]);
    for (let c of map[digits[i]]) {
      console.log('     ', c);
      go(i + 1, s + c);
    }
  }

  go(0, '');
  return res;
}


//  Minimum Cost For Tickets
var mincostTickets = function(days, costs ) {
  let dp = Array(days[days.length - 1] + 1).fill(0)
  dp[0] = 0;
  let set = new Set(days);
  for(let i = 1; i < dp.length; i++){
    if(!set.has(i)){
      dp[i] = dp[i - 1];
    } else {
      dp[i] = Math.min(
        dp[Math.max(0, i - 1)] + costs[0],
        dp[Math.max(0, i - 7)] + costs[1],
        dp[Math.max(0, i - 30)] + costs[2])
    }
  }
  return dp[dp.length - 1];
}



// Partition Equal Subset Sum
var canPartition = function(nums) {
  if(nums.length == 1) return false;
  let sum = nums.reduce((acc,val) => acc + val);

  if(sum % 2 !== 0)return false;
  sum /= 2;
  let dp = Array(sum + 1).fill(false)
  dp[0] = true;
  console.log(dp);
  for(let num of nums){
    for(let i = sum; i >= num; i--){
      dp[i] = dp[i] || dp[i - num]
      if(dp[sum]) return true;
      console.log(dp);
    }
  }
  return dp[sum];
}


// Partition to K Equal Sum Subsets
var count = 0;
var canPartitionKSubsets = function(nums, k) {
let sum = nums.reduce((a, v) => a + v);
	if(sum%k!==0) return false;
	let used = Array.from({length:nums.length}, x=>false);
  sum /= k;
	let endIdx = nums.length;
  const search = (start, target) => {
		if(endIdx === 0) return true;
		if(target === 0) return search(0, sum);
		for(let i = start; i<nums.length; i++){
			if(nums[i]>sum) return false;// any number > sum return false
			if(!used[i] && nums[i]<=target){
				used[i] = true;
				endIdx--;
				if(search(i+1, target-nums[i])) return true;
				used[i] = false;
				endIdx++;
			}
		}
		return false;
	}
	return  search(0, sum);
}


// Number of Dice Rolls With Target Sum
var numRollsToTarget = function(d, f, target) {
if (d*f<target) return 0;
  else if (d*f===target) return 1;
  const MAX = 1000000007
    let dp = new Array(target+1).fill(0)
    dp[0] = 1
    for (let i = 1; i<=d; i++) {
      console.log(i,'....................................');
        for (let t = dp.length - 1; t>=0; t--) {
          console.log(t, dp[t],'.....');
          // for each new dice, sub problem is to add up compliment for each face value.

            dp[t] = 0;
            console.log(dp[t]);
            for (let k = 1; k<=f && k<=t; k++) {
              console.log(k, ' ', dp[t],dp[t] + dp[t - k], t-k);
                dp[t] = (dp[t] + dp[t - k]) % MAX
                console.log(dp);
            }
        }
        console.log();
    }
    return dp[target]
};

// Smallest Subarray with a given sum 

function smallestSubarrofGivenSum(s, arr){
    var minSize = Infinity;
    var start = 0;
    var sum = 0;
    for(var i = 0; i < arr.length; i++){
        sum += arr[i];
        while(sum >= s){
        minSize = Math.min(minSize, i-start+1);
        sum -= arr[start];
        start++;
        }
    }
    return minSize===Infinity? 0: minSize;
}

// Fruites into baskets

const fruits_into_baskets = function(fruits) {
  var max = 0;
  var start = 0;
  var fre = {};
  for(var i = 0; i <fruits.length; i++){
      fre[fruits[i]]? fre[fruits[i]]++ : fre[fruits[i]] = 1;

      while(Object.keys(fre).length > 2){
          var f = fruits[start];
          fre[f]--;
          if(fre[f] === 0) delete(fre[f]);
          start++;
      }
      max = Math.max(max, i-start+1);
  }
  return max;
};



// Course Schedule
var canFinish = function(numCourses, prerequisites) {
    let graph = {};
    let flags = new Array(numCourses).fill(0);
    for (let i = 0; i < prerequisites.length; ++i) {
        let item = prerequisites[i];
        (graph[item[1]]) ? graph[item[1]].push(item[0]) : graph[item[1]] = [item[0]];
    }
    let dfs = course => {
        if (flags[course] === 1) return false;
        // if (flags[course] === -1) return true;
        let item = graph[course];
        flags[course] = 1;
        if (item)
            for (let i = 0; i < item.length; ++i) {
              console.log(item[i], 'item');
                if (!dfs(item[i])) return false;
            }
        flags[course] = -1;
        return true;
    }
    for (let i = 0; i < numCourses; ++i) {
        if (!dfs(i)) return false;
    }
    return true;
 }


// 701
var insertIntoBST = function(root, val) {
    if(val > root.val) {

        if(root.right === null) {
            root.right = new TreeNode(val);
        } else {
            root.right = insertIntoBST(root.right, val);
        }
    } else {
        if(root.left === null) {
            root.left = new TreeNode(val);
        } else {
            root.left = insertIntoBST(root.left, val);
        }
    }
    return root;
};


function findSubstring(bigString, samllString){
  if(samllString.length > bigString.length) return '';
  let windowStart = 0,
  matched = 0,
  subStart = 0,
  minLength = bigString.length + 1,
  fre = {};
  for(let i = 0; i < samllString.length; i++){
    let p = samllString[i];
    (p in fre) ? fre[p] += 1 : fre[p] = 1;
  }
  console.log(fre);
  for(let i = 0; i < bigString.length; i++){
    let char = bigString[i];
    if(char in fre){
      fre[char] -= 1;
      if(fre[char] >= 0) matched++;
    }

    while(matched === samllString.length){
      if(minLength > i - windowStart + 1){
        minLength = i - windowStart + 1;
        subStart = windowStart;
      }
      let leftChar = bigString[windowStart];
      windowStart++;
      if(leftChar in fre){
        if(fre[leftChar] == 0) {
          matched--;
        }
        fre[leftChar]++;
      }
    }
  }
  if (minLength > str.length) {
   return '';
  }
  return bigString.slice(subStart, subStart + minLength);
}
