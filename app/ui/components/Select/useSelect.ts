import { useState, useEffect } from 'react';

type UseSelectParams<T> = {
	selected: T | T[]
}

export function useSelect<T>({
	selected,
}: UseSelectParams<T>) {
	const [filterShowOptions, setFilterShowOptions] =
		useState<boolean>(false);
	const [showOptions, setShowOptions] =
		useState<boolean>(false);
	const [showPlaceholder, setShowPlaceholder] =
		useState<boolean>(false);

	function treatPlaceholderVisibility() {
		setShowPlaceholder(
			(!Array.isArray(selected) && !selected) ||
				(Array.isArray(selected) && selected.length === 0)
		);
	}

	useEffect(() => {
		treatPlaceholderVisibility();
	}, [selected]);

	return {
		showPlaceholder,
		filterShowOptions,
		showOptions,
		setFilterShowOptions,
		setShowOptions,
	};
}
