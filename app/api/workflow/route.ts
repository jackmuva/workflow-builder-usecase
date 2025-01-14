import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const contents = await request.json();
		console.log(contents);
		const headers = request.headers;
		if (headers.get("authorization")) {
			const token = headers.get("authorization")?.split(" ")[1];
			if (token) {
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

async function performAction(jwt: string, contents: { action: string, parameters: any, output?: any }) {
	const actionsUrl = "https://actionkit.useparagon.com/projects/" + process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID
	const actionHeaders = new Headers();
	actionHeaders.append("Content-Type", "application/json");
	actionHeaders.append("Authorization", "Bearer " + jwt);
	const actionResponse = await fetch(actionsUrl + "/actions", {
		method: "POST",
		headers: actionHeaders,
		body: JSON.stringify({ action: contents.action, parameters: contents.parameters }),
	});
	const actionBody = await actionResponse.json();
	return actionBody;
}
