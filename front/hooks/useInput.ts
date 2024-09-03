import { useState, useCallback, ChangeEventHandler, Dispatch, SetStateAction } from "react";

type ReturnType = [string, (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, Dispatch<SetStateAction<string>>];

export default (initialValue = "") => {
	const [state, setState] = useState(initialValue);
	const handler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((event) => setState(event.target.value), []);

	return [state, handler, setState] as ReturnType;
};
