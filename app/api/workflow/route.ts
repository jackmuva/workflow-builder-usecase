import { NextRequest, NextResponse } from "next/server";
import { performAction } from "../test-step/route";

export async function POST(request: NextRequest) {
	try {
		const contents = await request.json();
		console.log(contents);
		const headers = request.headers;
		if (headers.get("authorization")) {
			const token = headers.get("authorization")?.split(" ")[1];
			const nodes = contents.nodes;
			const edges = contents.edges;
			if (token && nodes.length > 0) {
				const edgeMap = new Map();
				const nodeMap = new Map();
				const resMap = new Map();
				const queue = [];

				for (const edge of edges) {
					if (edgeMap.has(edge.source)) {
						edgeMap.set(edge.source, [...edgeMap.get(edge.source), edge.target]);
					} else {
						edgeMap.set(edge.source, [edge.target]);
					}
				}
				for (const node of nodes) {
					nodeMap.set(node.id, node.data.funcProperties);
				}

				queue.push('1');
				while (queue.length > 0) {
					const nodeId = queue.shift();
					const selectedNode = nodeMap.get(nodeId);
					resMap.set(nodeId, performAction(token, selectedNode));
					console.log(nodeId);
					if (edgeMap.has(nodeId)) {
						for (const id of edgeMap.get(nodeId)) {
							queue.push(id);
						}
					}
				}

				return NextResponse.json(
					{ status: 200, body: contents },
				);
			}
		}
	} catch (error) {
		console.error("[WORKFLOW]", error);
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 },
		);
	}
}

export const performWorkflowAction = async (resMap: Map<string, any>, token: string, contents: { action: string, parameters: any, output?: any }) => {
	for (let param of contents.parameters) {
		const matches = param.match(/\{(.*?)\}/);
		if (matches) {
			const variableString = matches[1];
			const variableElements = variableString.split('.');
			if (resMap.has(variableElements[0])) {
				param = param.replace("{" + variableString + "}", resMap.get(variableElements[0]));
			}
		}

	}
	return performAction(token, contents);
}
