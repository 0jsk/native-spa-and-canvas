import { phoneRegex } from "../../utils";
import { UserTemplate } from "../../api/user";
import { validateElements } from "../../utils/validateElements";
import "./user-add-form.css";

type UserAddFormProps = {
	onAdd: (user: UserTemplate) => void
}

export const UserAddForm = ({ onAdd }: UserAddFormProps): HTMLFormElement => {
	const form = document.createElement("form");
	form.classList.add("user-add-form");

	const nameInput = document.createElement("input");
	nameInput.required = true;
	nameInput.classList.add("unvalidated");

	const phoneInput = document.createElement("input");
	phoneInput.required = true;
	phoneInput.pattern = phoneRegex.source;
	phoneInput.classList.add("unvalidated");

	const addButton = document.createElement("button");

	addButton.appendChild(
		document.createTextNode("add")
	);

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const isFormValidInvalid = !validateElements(nameInput, phoneInput);

		if (isFormValidInvalid) {
			return;
		}

		onAdd({
			name: nameInput.value,
			phone: phoneInput.value
		})
	});

	form.append(
		nameInput,
		phoneInput,
		addButton
	);

	return form;
};
