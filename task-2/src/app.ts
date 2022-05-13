import { Observable } from "./shared";
import { UserAddForm, UserTable } from "./shared/components";
import { getUsers, User } from "./shared/api";
import { MeasuredUser } from "./shared/api/types";
import { createUser, deleteUser, UserTemplate } from "./shared/api/user";

export const renderApp = (root: Element | DocumentFragment) => {
	const users = getUsers();

	const userToMeasuredUser = (user: User): MeasuredUser => ({ ...user, isEdit: false });

	const state = new Observable<MeasuredUser[]>(
		users.map(userToMeasuredUser)
	);

	const updateUsers = (newUsers: MeasuredUser[]) => {
		state.value = newUsers;
	};

	const addUser = (userTemplate: UserTemplate) => {
		createUser(userTemplate);

		state.value = getUsers().map(userToMeasuredUser);
	};

	const removeUser = (user: User) => {
		const updatedUsers = deleteUser(user);

		state.value = updatedUsers.map(userToMeasuredUser);
	}

	const renderTable = UserTable({ onChange: updateUsers, onDelete: removeUser });
	const addForm = UserAddForm({ onAdd: addUser });

	state.subscribe(users => renderTable({ users }));
	state.subscribe(console.log);

	root.append(
		renderTable({
			users: state.value
		}),
		addForm
	);
};
