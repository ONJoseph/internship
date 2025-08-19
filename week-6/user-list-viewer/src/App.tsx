import { useEffect, useState } from "react";
import type { User } from "./types/user";
import Loader from "./components/Loader";
import ErrorMsg from "./components/ErrorMsg";
import UserList from "./components/UserList";
import Footer from "./components/Footer";


export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("https://jsonplaceholder.typicode.com/users", { signal: ctrl.signal })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => ctrl.abort();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
      <h1 className="text-center text-3xl font-bold text-blue-700 mb-6">
        User List Viewer by Joseph Ogbole
      </h1>
      <main className="flex-grow max-w-3xl mx-auto space-y-4">
        {loading && <Loader />}
        {error && <ErrorMsg message={error} />}
        {!loading && !error && <UserList users={users} />}
      </main>
      <Footer />
    </div>
  );
}
