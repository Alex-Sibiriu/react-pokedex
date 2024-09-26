export default function Error({ message }) {
	return (
		<div className="errorComponent w-full h-full p-4 text-center text-white text-3xl font-bold">
			<p>{message}</p>
		</div>
	);
}
