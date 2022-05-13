export const validateElements = (...elements: { checkValidity(): boolean }[]): boolean =>
	elements.every(element => element.checkValidity());
