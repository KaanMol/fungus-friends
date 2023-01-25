import { useTransition } from "transition-hook";

export function CenterMessage(props: { showIf: boolean; message: string }) {
	const { stage, shouldMount } = useTransition(props.showIf, 300);

	return (
		<>
			{shouldMount && (
				<div
					style={{
						transition: ".3s",
						opacity: stage === "enter" ? 1 : 0,
					}}
					className="center-message"
				>
					{props.message}
				</div>
			)}
		</>
	);
}
