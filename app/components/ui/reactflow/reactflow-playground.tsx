import { ReactFlow, Controls, Background, applyEdgeChanges, applyNodeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { ReactflowSidebar } from './reactflow-sidebar';
import { SalesforceNode } from './nodes/SalesforceNode';

function ReactflowPlayground() {
	const initialNodes = [
		{
			id: '1',
			data: { label: 'Hello' },
			position: { x: 0, y: 0 },
			type: 'input',
		},
		{
			id: '2',
			data: { label: 'World' },
			position: { x: 100, y: 100 },
			type: 'salesforceNode'
		},
	];

	const initialEdges = [{ id: '1-2', source: '1', target: '2' }];

	const [nodes, setNodes] = useState<Array<any>>(initialNodes);
	const [edges, setEdges] = useState(initialEdges);

	useEffect(() => {
		if (localStorage.getItem("nodes") !== null && localStorage.getItem("edges") !== null) {
			setNodes(JSON.parse(localStorage.getItem("nodes") ?? ""));
			setEdges(JSON.parse(localStorage.getItem("edges") ?? ""));
		}
	}, []);


	const nodeTypes = useMemo(() => ({ salesforceNode: SalesforceNode }), []);
	const onNodesChange = useCallback(
		(changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[],
	);
	const onEdgesChange = useCallback(
		(changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[],
	);
	const onConnect = useCallback(
		(params: any) => setEdges((eds) => addEdge(params, eds)),
		[],
	);

	return (
		<div className='flex border-2 bg-stone-50 w-screen min-h-screen z-0 fixed top-20 left-0 '>
			<ReactFlow className='min-h-screen h-full w-full basis-4/5'
				nodes={nodes} edges={edges} onConnect={onConnect}
				onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
				nodeTypes={nodeTypes}>
				<Background />
				<Controls />
			</ReactFlow>
			<ReactflowSidebar nodes={nodes} setNodes={setNodes} edges={edges}></ReactflowSidebar>
		</div >
	);
}

export default ReactflowPlayground;
