import { Node } from "@xyflow/react";

export const ReactflowSidebar = ({ nodes, setNodes, edges }: { nodes: Array<any>, setNodes: any, edges: any }) => {

	const addNode = () => {
		setNodes([...nodes, {
			id: '3',
			data: { label: 'New Buddy' },
			position: { x: 200, y: 200 },
		}]);
	};

	const saveWorkflow = () => {
		localStorage.setItem("nodes", JSON.stringify(nodes));
		localStorage.setItem("edges", JSON.stringify(edges));
	}

	return (
		<div className='basis-1/5 rounded-xl m-1 shadow-lg p-2 flex flex-col items-center space-y-1'>
			<button className='border-2 rounded-lg bg-stone-100 py-2 w-11/12' onClick={addNode}>
				Run Workflow
			</button>
			<button className='border-2 rounded-lg bg-stone-100 py-2 w-11/12' onClick={saveWorkflow}>
				Save Workflow
			</button>
			<button className='border-2 rounded-lg bg-stone-100 py-2 w-11/12' onClick={addNode}>
				Add Node
			</button>


		</div>
	);
};
