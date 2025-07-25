export default function ErrorMsg({ message }: { message: string }) {
  return <div className="text-red-600 bg-red-100 border border-red-200 rounded p-3">{message}</div>;
}
