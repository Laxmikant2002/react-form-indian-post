export default function Loader() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}