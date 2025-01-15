import { useCallback, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';

export function ActionNode({ data }: { data: any }) {
	const [expand, setExpand] = useState<boolean>(false);
	const [params, setParams] = useState<{ parameters: any, output: string }>({ parameters: {}, output: "" });

	useEffect(() => {
		data.funcProperties = { action: data.functionData.function.name, parameters: {}, output: "" };
		for (const param of Object.keys(data.functionData.function.parameters.properties)) {
			data.funcProperties.parameters[param] = "";
		}
	}, []);

	const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
		data.funcProperties.parameters = { ...data.funcProperties.parameters, [evt.target.name]: evt.target.value };
		setParams((prev) => ({ ...prev, parameters: data.funcProperties.parameters }));
	}, []);

	const testStep = async () => {
		const url = window.location.href + "/api/test-step";
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));

		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(data.funcProperties),
			headers: headers
		});

		const body = await response.json();

		data.funcProperties = { ...data.funcProperties, output: JSON.stringify(body.body).replaceAll(",", ",\n") };
		setParams((prev) => ({ ...prev, output: data.funcProperties.output }));
	}

	const toggleExpand = () => {
		setExpand(!expand);
	}

	return (
		<>
			{data.label.charAt(0) !== '1' && <Handle type="target" position={Position.Top} />}
			<div className='flex flex-col rounded-lg border-2 bg-stone-100 p-2 space-y-2'>
				<div className='flex space-x-2'>
					<img src={data.pic} style={{ maxWidth: "30px" }} />
					<button onClick={toggleExpand} className='font-bold text-blue-700'>{data.label}</button>
				</div>
				{expand &&
					<div className='flex flex-col space-y-2'>
						{Object.keys(data.functionData.function.parameters.properties).map((prop: string) => {
							return (
								<label key={prop}>{prop}:
									<input value={data?.funcProperties?.parameters[prop]} id="text" name={prop} onChange={onChange} className="p-1 nodrag ml-2 border-2" />
								</label>
							)
						})
						}
						<button onClick={testStep} className='border-stone-800 bg-green-200 hover:bg-green-400 rounded-lg border-2 p-1'> Test Step </button>
						{data.funcProperties.output !== "" &&
							<textarea readOnly className='p-1 w-96 whitespace-pre-line z-30 h-96 overflow-scroll'
								value={data.funcProperties.output} />
						}

					</div>
				}
			</div>
			<Handle type="source" position={Position.Bottom} id="a" />
		</>
	);
}
