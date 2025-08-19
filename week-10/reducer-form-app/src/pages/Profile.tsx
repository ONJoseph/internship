import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { state } = useAuth();
  const user = state.user!;

  return (
    <section className="mx-auto max-w-lg">
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
      <div className="rounded border p-4 bg-white dark:bg-gray-800">
        <p><span className="opacity-70">Username:</span> {user.username}</p>
        <p><span className="opacity-70">Email:</span> {user.email}</p>
      </div>
    </section>
  );
}
