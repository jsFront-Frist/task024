// Node.prototype.getLevel = function () {
//
// };
//
// function Node (data,left,right,level,show) {
//     this.data = data;
//     this.left = left ;
//     this.right = right;
//     this.level = level;
//     this.show = show;
//
// }
//
// function showColor () {
//
// }
//
//
// function buildTree (nodeList) {
//     var nodeList = nodeList || [1,2,3,4,5,6];
//     for (var i = 0; i < nodeList.length; i++) {
//         if (i === 0) {
//             var tree = new Node(nodeList[0],null,null,1,showColor);
//         } else {
//             insertNode(tree,nodeList[i]);
//         }
//
//     }
//
// }
// function insertNode (Tree ,nodeData) {
//     var pre = null,
//         now = null,
//         right = null,
//         left = null;
//     var newNode = new Node (nodeData,null,null,null,showColor);
//     if(Tree == null) {
//         Tree = newNode;
//         return tree;
//     } else {
//         now = tree;
//         while(now) {
//             if(now.data === nodeData) {
//                 throw "有冲突";
//                 return false;
//             } else if(nodeData < now.data) {
//                 pre = now;
//                 now = now.left;
//             } else {
//                 pre = now ;
//                 now = now.right;
//             }
//         }
//         if(nodeData < pre.data) {
//             pre.left = newNode;
//         } else {
//             pre.right = newNode;
//         }
//         return true;
//     }
// }
/*
 * 原来打算在递归遍历的过程中为节点添加颜色，后来参考veah的代码发现可以通过层次遍历来实现
 */
(function() {
	var level = [];
	var element = /Element/;
	var target = null;
	document.getElementById("begin").addEventListener("click",function (params) {
		toggleButton(true);
		DLR(document.getElementById("root"));
		showColor(level,document.getElementById("search").value);
		level = [];
	})
	document.getElementById("DLR").addEventListener("click", function(e) {
		toggleButton(true);
		DLR(document.getElementById("root"));
		showColor(level,null);
		level = [];
	})
	document.getElementById("root").addEventListener("click",function name(e) {
		for(var i = 0; i<document.getElementsByTagName("div").length;i++) {
			document.getElementsByTagName("div")[i].style.backgroundColor = "white";
		}
		 e.srcElement.style.backgroundColor = 'orange';
		 target = e.srcElement || e.target;
	});
	document.getElementById("insert-ctr").addEventListener("click",function (e) {
		var div = document.createElement("div");
		div.innerText = document.getElementById("insert").value;
		div.setAttribute("class","box");
		target.insertBefore(div,target.firstElementChild);
	})
	// document.getElementById("LDR").addEventListener("click", function() {
	// 	toggleButton(true);
	// 	LDR(document.getElementById("root"));
	// 	showColor(level);
	// })
	document.getElementById("LRD").addEventListener("click", function() {
		toggleButton(true);
		LRD(document.getElementById("root"));
		showColor(level,null);
		level = [];
	})
	/*先序遍历*/
	function DLR(node) {
		 
		try {
			if (node) {
				level.push(node);
				for(var i = 0;i<node.childNodes.length;i++) {
					if(element.test(node.childNodes[i].toString())) {
						DLR(node.childNodes[i]);
						
						
					} 
						
				}
				
				
			}
		} catch (e) {
			//TODO handle the exception
			throw e;
		}

	}
	/*中序遍历*/
	// function LDR(node) {

	// 	try {
	// 		if (node) {
	// 			LDR(node.firstElementChild);
	// 			level.push(node);
	// 			LDR(node.lastElementChild);
	// 		}
	// 	} catch (e) {
	// 		//TODO handle the exception
	// 		throw "节点错误";
	// 	}
	// }
	/*后序遍历*/
	function LRD　(node) {
		try {
			if (node) {
				for(var i = 0;i<node.childNodes.length;i++) {
					if(element.test(node.childNodes[i].toString()))
						LRD(node.childNodes[i]);
				}
				level.push(node);
			}
		} catch (e) {
			//TODO handle the exception
			throw "节点错误";
		}
	}

	function showColor(queue,search) {
		var now = null;
		if (queue) {
			now = queue.shift();
			if (now) {
				now.style.backgroundColor = 'pink';
				setTimeout(function() {
					now.style.backgroundColor = "#ffffff";
					if(now.firstChild.nodeValue.valueOf() != parseInt(search.valueOf())) {
						showColor(queue,search);
					}
					else {
						now.style.backgroundColor = 'blue';
							toggleButton(false);
					}
					
				}, 500)
			} else {
				toggleButton(false);
			}


		} else {
			
			return true;
		}


	}
	/*禁用按钮*/
	function toggleButton(value) {
		if (value == true) {
			for (var i = 0; i < 3; i++) {
				document.getElementsByTagName("button")[i].setAttribute("disabled", "disabled");

			}
		} else {
			for (var i = 0; i < 3; i++) {
				document.getElementsByTagName("button")[i].removeAttribute("disabled");

			}
		}

	}
})()