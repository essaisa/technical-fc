export default function SearchPage() {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Search Players</h1>
  
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full p-3 border rounded mb-6"
        />
  
        <div className="p-4 border rounded-xl">
          <p className="text-gray-500">Results will appear here</p>
        </div>
      </div>
    )
  }