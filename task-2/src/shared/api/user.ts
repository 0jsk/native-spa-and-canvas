import { users } from "./placeholders";

let currentUsers = [...users];

export type User = {
	id: string
	name: string
	phone: string
};

export type UserTemplate = Omit<User, "id">;

export const getUsers = () => currentUsers;

export const createUser = (user: UserTemplate) => {
	const id = Math.random().toString(36).substring(7);

	const newUser = {
		...user,
		id
	};

	currentUsers.push(newUser);

	return newUser;
}

export const deleteUser = (user: User) => {
	currentUsers = currentUsers.filter(existedUser => existedUser.id !== user.id);

	return currentUsers;
}
