import type { User } from "../types/user";
import UserCard from "./UserCard";
import { useState } from "react";

export default function UserList({ users }: { users: User[] }) {
  const [filter, setFilter] = useState("");
  const filtered = users.filter(u => u.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search users..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />
      {filtered.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map(u => <UserCard key={u.id} user={u} />)}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">No users found.</p>
      )}
    </div>
  );
}
