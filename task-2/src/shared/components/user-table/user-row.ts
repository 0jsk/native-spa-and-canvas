import { MeasuredUser } from "../../api/types";
import { phoneRegex } from "../../utils";
import { validateElements } from "../../utils/validateElements";

type UserRowProps = {
	user: MeasuredUser
	isEdit: boolean
	onChange: (user: MeasuredUser) => void
	onDelete: (user: MeasuredUser) => void
}

export const UserRow = ({ user, isEdit, onChange, onDelete }: UserRowProps) => {
	const row = document.createElement("tr");

	const nameCell = row.insertCell(0);
	nameCell.classList.add("user-table__cell");

	const phoneCell = row.insertCell(1);
	phoneCell.classList.add("user-table__cell");

	return (): HTMLTableRowElement => {
		if (isEdit) {
			const nameInput = document.createElement("input");
			nameInput.value = user.name;
			nameInput.required = true;

			const phoneInput = document.createElement("input");
			phoneInput.value = user.phone;
			phoneInput.required = true;
			phoneInput.pattern = phoneRegex.source;

			const saveButton = document.createElement("button");

			saveButton.appendChild(
				document.createTextNode("save")
			);

			const validateInputs = () => {
				console.log(validateElements(nameInput, phoneInput));
				saveButton.disabled = !validateElements(nameInput, phoneInput);
			}

			nameInput.addEventListener("input", validateInputs);
			phoneInput.addEventListener("input", validateInputs);

			saveButton.addEventListener("click", () => {
				onChange({
					...user,
					name: nameInput.value,
					phone: phoneInput.value,
					isEdit: false
				})
			});

			nameCell.appendChild(nameInput);
			phoneCell.append(phoneInput, saveButton);
		} else {
			const editButton = document.createElement("button");

			editButton.appendChild(
				document.createTextNode("edit")
			);

			editButton.addEventListener("click", () => {
				onChange({
					...user,
					isEdit: true
				})
			});

			nameCell.appendChild(
				document.createTextNode(user.name)
			);

			phoneCell.append(
				document.createTextNode(user.phone),
				editButton
			);
		}

		const removeButton = document.createElement("button");

		removeButton.appendChild(
			document.createTextNode("remove")
		);

		removeButton.addEventListener("click", () => onDelete(user));

		phoneCell.appendChild(removeButton);

		return row;
	};
};
