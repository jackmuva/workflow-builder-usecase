import { Handle, Position } from '@xyflow/react';

export function TriggerNode({ data }: { data: any }) {

	return (
		<>
			<div className='flex flex-col rounded-lg border-2 bg-stone-100 p-2'>
				<label className='font-bold text-blue-700' htmlFor="text">{data.label}</label>
			</div>
			<Handle type="source" position={Position.Bottom} id="a" />
		</>
	);
}
