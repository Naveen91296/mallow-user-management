import type { User } from "../redux/reduxTypes/api";

export const filterUsersBySearch = (
  users: User[],
  searchString: string
): User[] => {
  if (!searchString.trim()) return users;

  const search = searchString.toLowerCase().trim();

  return users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const firstName = user.first_name.toLowerCase();
    const lastName = user.last_name.toLowerCase();

    return (
      fullName.includes(search) ||
      firstName.includes(search) ||
      lastName.includes(search)
    );
  });
};
