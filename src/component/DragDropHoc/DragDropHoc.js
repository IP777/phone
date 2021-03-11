const DragDropHoc = (Component) => {
	console.log("children--------");
	return Component;
};

export default DragDropHoc;

// const DragDropHoc = ({ children }) => {
// 	console.log("children", children);
// 	console.log("children", {
// 		...children,
// 		props: {
// 			...children.props,
// 			className: "wrapper cool",
// 			style: "margin-top: 30px;",
// 		},
// 	});
// 	return {
// 		...children,
// 		props: {
// 			...children.props,
// 			className: "wrapper cool",
// 			style: { left: "500px" },
// 		},
// 	};
// };

// export default DragDropHoc;
