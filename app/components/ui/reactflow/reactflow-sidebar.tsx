import { useEffect, useState } from "react";
import { paragon } from "@useparagon/connect";
import useParagon from "@/app/hooks/useParagon";

export const ReactflowSidebar = ({ nodes, setNodes, edges }: { nodes: Array<any>, setNodes: any, edges: any }) => {
	const [actions, setActions] = useState<{ integrations: Array<any>, actions: any }>({ integrations: [], actions: {} });
	useParagon();

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

	const fetchActions = async () => {
		const actionsUrl = "https://actionkit.useparagon.com/projects/" + process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID

		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));
		const params = new URLSearchParams({
			format: "json_schema",
			limit_to_available: "true"
		}).toString();

		const actionResponse = await fetch(actionsUrl + "/actions/?" + params, {
			method: "GET",
			headers: headers
		});
		const actionBody = await actionResponse.json();
		return actionBody;
	}

	useEffect(() => {
		fetchActions().then((actions) => {
			console.log(actions);
			console.log(paragon.getIntegrationMetadata());
			setActions({ integrations: paragon.getIntegrationMetadata(), actions: actions });
		});
	}, []);

	return (
		<div className='basis-1/5 rounded-xl m-1 shadow-lg p-2 flex flex-col items-center space-y-1'>
			<button className='border-2 rounded-lg bg-stone-100 py-2 w-11/12' onClick={addNode}>
				Run Workflow
			</button>
			<button className='border-2 rounded-lg bg-stone-100 py-2 w-11/12' onClick={saveWorkflow}>
				Save Workflow
			</button>
			{actions.integrations.map((integration) => {
				return (
					<button className='flex space-x-2 p-2 items-center justify-between w-full border-b-2 border-b-stone-200'>
						<img src={integration.icon} style={{ maxWidth: "30px" }} />
						<p>{integration.name} Actions</p>
						<svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></path> </g></svg>
					</button>
				);
			})
			}
		</div>
	);
};
