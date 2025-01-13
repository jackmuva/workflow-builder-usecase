import { useCallback, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';

export function ActionNode({ data }: { data: any }) {
	const [funcProperties, setFuncProperties] = useState<{ action: string, parameters: any, output: string }>({
		action: data.functionData.function.name, parameters: {}, output: ""
	});

	useEffect(() => {
		const props = { action: data.functionData.function.name, parameters: {}, output: "" };
		if (data.functionData.function.parameters) {
			for (const property of Object.keys(data.functionData.function.parameters.properties)) {
				//@ts-ignore
				props.parameters[property] = "";
			}
			setFuncProperties(props);
		}
	}, []);

	const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
		setFuncProperties(prev => ({ ...prev, parameters: { ...prev.parameters, [evt.target.name]: evt.target.value } }));
	}, []);

	const testStep = async () => {
		const url = window.location.href + "/api/test-step";
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));

		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(funcProperties),
			headers: headers
		});

		const body = await response.json();

		console.log(JSON.stringify(body.body).replaceAll(",", ",\n"));
		setFuncProperties(prev => ({ ...prev, output: JSON.stringify(body.body).replaceAll(",", ",\n") }));
	}

	return (
		<>
			<Handle type="target" position={Position.Top} />
			<div className='flex flex-col rounded-lg border-2 bg-stone-100 p-2 group space-y-2'>
				<div className='font-bold text-blue-700'>{data.label}</div>
				<div className='hidden group-hover:block'>
					<div className='flex flex-col space-y-2'>
						{Object.keys(funcProperties.parameters).map((prop) => {
							return (
								<label key={prop}>{prop}:
									<input id="text" name={prop} onChange={onChange} className="p-1 nodrag ml-2 border-2" />
								</label>
							)
						})
						}
						<button onClick={testStep} className='border-stone-800 bg-green-200 hover:bg-green-400 rounded-lg border-2 p-1'> Test Step </button>
						{funcProperties.output !== "" &&
							<textarea readOnly className='p-1 w-96 whitespace-pre-line z-30 h-96 overflow-scroll'>
								{funcProperties.output}
							</textarea>
						}
					</div>

				</div>
			</div>
			<Handle type="source" position={Position.Bottom} id="a" />
		</>
	);
}
