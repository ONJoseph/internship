export default function Home() {
  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Welcome 👋</h1>
      <p className="opacity-80">
        This app demonstrates <code>useReducer</code> for complex state and a reusable{" "}
        <code>useForm</code> custom hook for form handling and validation. Register, login,
        and view your profile. All state is neatly organized and strongly typed.
      </p>
    </section>
  );
}
