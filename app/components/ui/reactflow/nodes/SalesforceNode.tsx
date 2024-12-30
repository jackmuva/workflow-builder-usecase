import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

export function SalesforceNode() {

	const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
		console.log(evt.target.value);
	}, []);

	return (
		<>
			<Handle type="target" position={Position.Top} />
			<div className='flex flex-col rounded-lg border-2 bg-stone-100 p-2'>
				<label className='font-bold text-blue-700' htmlFor="text">Salesforce Action</label>
				<input id="text" name="text" onChange={onChange} className="nodrag" />
			</div>
			<Handle type="source" position={Position.Bottom} id="a" />
		</>
	);
}
