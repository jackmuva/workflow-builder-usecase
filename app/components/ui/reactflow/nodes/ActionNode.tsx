import { useCallback, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';

export function ActionNode({ data }: { data: any }) {
	const [funcProperties, setFuncProperties] = useState<{ action: string, parameters: any, output: string }>({
		action: data.functionData.function.name, parameters: {}, output: ""
	});
	const [expand, setExpand] = useState<boolean>(false);

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
		data.funcProperties = { ...funcProperties, parameters: { ...funcProperties.parameters, [evt.target.name]: evt.target.value } };
		setFuncProperties(prev => ({ ...prev, parameters: { ...prev.parameters, [evt.target.name]: evt.target.value } }));
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

		setFuncProperties(prev => ({ ...prev, output: JSON.stringify(body.body).replaceAll(",", ",\n") }));
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
						{Object.keys(funcProperties.parameters).map((prop: string) => {
							return (
								<label key={prop}>{prop}:
									<input value={data?.funcProperties?.parameters[prop]} id="text" name={prop} onChange={onChange} className="p-1 nodrag ml-2 border-2" />
								</label>
							)
						})
						}
						<button onClick={testStep} className='border-stone-800 bg-green-200 hover:bg-green-400 rounded-lg border-2 p-1'> Test Step </button>
						{funcProperties.output !== "" &&
							<textarea readOnly className='p-1 w-96 whitespace-pre-line z-30 h-96 overflow-scroll'
								value={funcProperties.output} />
						}

					</div>
				}
			</div>
			<Handle type="source" position={Position.Bottom} id="a" />
		</>
	);
}
