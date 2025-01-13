export const ActionButton = ({ action, addNode }: { action: any, addNode: any }) => {

	const parseNames = (name: string) => {
		const nameArray = name.split("_");
		let res = "";
		for (const name of nameArray) {
			let newName = name.toLowerCase();
			newName = String(newName.charAt(0).toUpperCase()) + newName.slice(1);
			res += newName + " ";
		}
		return res.slice(0, -1);
	}

	return (
		<div>
			<button
				className='border-2 rounded-lg bg-stone-100 py-2 w-full'
				onClick={() => addNode(parseNames(action.function.name), action)}>
				{parseNames(action.function.name)}
			</button>
		</div>
	);
}
