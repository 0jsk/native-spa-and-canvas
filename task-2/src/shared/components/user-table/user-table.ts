import "./table-styles.css";
import { UserRow } from "./user-row";
import { MeasuredUser } from "../../api/types";

type UserTableState = {
	users: MeasuredUser[]
}

type UserTableProps = {
	onChange: (users: MeasuredUser[]) => void
	onDelete: (user: MeasuredUser) => void
}

export const UserTable = ({ onChange, onDelete }: UserTableProps) => {
	const table = document.createElement("table");
	table.classList.add("user-table");

	const thead = table.createTHead();

	const trHead = thead.insertRow(0);

	const thName = document.createElement("th");
	thName.classList.add("user-table__header-cell");

	const thPhone = document.createElement("th");
	thPhone.classList.add("user-table__header-cell");

	thName.appendChild(
		document.createTextNode("Имя")
	);

	thPhone.appendChild(
		document.createTextNode("Телефон")
	);

	trHead.append(thName, thPhone);

	const tbody = table.createTBody();

	return ({ users }: UserTableState): HTMLTableElement => {
		const currentRows = Array.from(tbody.rows);

		currentRows.forEach(row => row.remove());

		const deleteUser = (user: MeasuredUser) => onDelete(user);

		const changeUser = (user: MeasuredUser) => {
			const usersCopy = [...users];
			const userIndex = users.findIndex(existedUser => existedUser.id === user.id);

			usersCopy.splice(userIndex, 1, user);

			onChange(usersCopy);
		};


		users.map((user) => {
			const renderUserRow = UserRow({
				user,
				isEdit: user.isEdit,
				onChange: changeUser,
				onDelete: deleteUser
			});

			tbody.appendChild(
				renderUserRow()
			);
		});

		return table;
	};
};
