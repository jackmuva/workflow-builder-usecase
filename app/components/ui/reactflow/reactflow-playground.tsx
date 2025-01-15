import { ReactFlow, Controls, Background, applyEdgeChanges, applyNodeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { ReactflowSidebar } from './reactflow-sidebar';
import { ActionNode } from './nodes/ActionNode';
import { TriggerNode } from './nodes/TriggerNode';

function ReactflowPlayground() {
	const [nodes, setNodes] = useState<Array<any>>([]);
	const [edges, setEdges] = useState<Array<{ id: string, source: string, target: string }>>([]);
	const [newId, setNewId] = useState<number>(0);

	useEffect(() => {
		if (localStorage.getItem("nodes") !== null && localStorage.getItem("edges") !== null) {
			setNodes(JSON.parse(localStorage.getItem("nodes") ?? ""));
			setEdges(JSON.parse(localStorage.getItem("edges") ?? ""));
		}
	}, []);

	useEffect(() => {
		let largest = 0;
		for (const node of nodes) {
			if (Number(node.id) > largest) {
				largest = Number(node.id);
			}
		}
		setNewId(largest + 1);
	}, [nodes]);


	const nodeTypes = useMemo(() => ({ actionNode: ActionNode, triggerNode: TriggerNode }), []);
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
		<div className='flex border-2 bg-stone-50 w-screen z-0 fixed top-20 left-0 '>
			<ReactFlow className='min-h-[700px] h-full w-full basis-4/5'
				nodes={nodes} edges={edges} onConnect={onConnect}
				onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
				nodeTypes={nodeTypes}
				zoomOnScroll={false}>
				<Background />
				<Controls />
			</ReactFlow>
			<ReactflowSidebar nodes={nodes} setNodes={setNodes} setEdges={setEdges} edges={edges} newId={newId}></ReactflowSidebar>
		</div >
	);
}

export default ReactflowPlayground;
