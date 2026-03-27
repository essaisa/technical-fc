export default function PlayersPage() {

    const players = [
        { name: "Bukayo Saka", position: "RW", age: 24 },
        { name: "Cole Palmer", position: "CAM", age: 24 },
        { name: "Virgil Van Dijk", position: "CB", age: 34 },
        { name: "Gianluigi Donnarumma", position: "GK", age: 27 },
      ]

      const getPositionColor = (position: string) => {
        switch (position) {
          case "FW":
          case "RW":
          case "LW":
            return "bg-blue-500" // attackers
      
          case "CAM":
          case "CM":
          case "CDM":
            return "bg-green-500" // midfield
      
          case "CB":
          case "LB":
          case "RB":
            return "bg-yellow-500" // defenders
      
          case "GK":
            return "bg-red-500" // goalkeeper
      
          default:
            return "bg-gray-400"
        }
      }
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-press-start dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-row items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            <div className="w-full">
                <div className="flex items-center justify-center mb-4">
                    <h1 className="text-2xl font-bold"> PLAYERS </h1>
                </div>
                <div className="flex font-bold border-b p-2">
                    <span className="w-1/3">Name</span>
                    <span className="w-1/3">Position</span>
                    <span className="w-1/3">Age</span>
                </div>

                {players.map((player, index) => (
                    <div key={index} className="flex p-2 border-b">
                    <div className={`w-2 ${getPositionColor(player.position)} mr-4 self-stretch`} />
                    <span className="w-1/3">{player.name}</span>
                    <span className="w-1/3">{player.position}</span>
                    <span className="w-1/3">{player.age}</span>
                    </div>
                ))}
                </div>
            </main>
        </div>
    )
  }