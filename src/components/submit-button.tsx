import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export function SubmitButton({
	text,
	icon,
}: { text: string; icon?: React.ReactNode }) {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button type="submit" disabled className="flex h-12 items-center">
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Loading
				</Button>
			) : (
				<Button type="submit" className="flex h-12 w-full gap-2">
					{icon}
					{text}
				</Button>
			)}
		</>
	);
}
