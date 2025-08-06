export default function LoadingScreen() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white text-gray-700 animate-fade-in">
      <div className="text-3xl font-bold mb-2">Memasuki undangan...</div>
      <div className="loader mt-4" />
    </div>
  );
}
