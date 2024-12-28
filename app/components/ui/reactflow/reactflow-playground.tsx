import { ReactFlow, Controls, Background } from '@xyflow/react';

function ReactflowPlayground() {
	const nodes = [
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
		},
	];

	return (
		<div className='h-full border-2 min-h-[500px] bg-stone-50 rounded-lg shadow-2xl' style={{ height: '100%' }}>
			<ReactFlow className='min-h-[500px] h-full w-full' nodes={nodes} fitView>
				<Background />
				<Controls />
			</ReactFlow>
		</div>
	);
}

export default ReactflowPlayground;
