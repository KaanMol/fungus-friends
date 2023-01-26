export function MutliSelector(props: {
	name: string;
	label: string;
	onChange: (arg0: React.ChangeEvent<HTMLInputElement>) => void;
	inputs: { title: string; value: number; checked: boolean }[];
	onClear: () => void;
	showClear: boolean;
}) {
	return (
		<div className="multi-selector">
			<div className="top">
				<div className="title">{props.label}</div>

				{props.showClear && (
					<button onClick={props.onClear}>Clear</button>
				)}
			</div>

			{props.inputs.map((input) => (
				<div key={input.title} className="option">
					<input
						type="checkbox"
						value={input.value}
						name={props.name}
						checked={input.checked}
						onChange={props.onChange}
					/>{" "}
					{input.title}
				</div>
			))}
		</div>
	);
}
