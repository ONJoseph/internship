import type { User } from "../types/user";

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="bg-white rounded shadow p-4 hover:bg-blue-50 transition">
      <h3 className="text-lg font-semibold text-blue-700">{user.name}</h3>
      <p className="text-sm text-gray-600">@{user.username}</p>
      <a href={`mailto:${user.email}`} className="text-sm text-blue-500 hover:underline">{user.email}</a>
    </div>
  );
}
