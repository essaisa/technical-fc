import Image from "next/image"

export default function PlayerInfo() {
    

    const players = [
        { name: "Bukayo Saka", position: "RW", age: 24 },
        { name: "Cole Palmer", position: "CAM", age: 24 },
        { name: "Virgil Van Dijk", position: "CB", age: 34 },
        { name: "Gianluigi Donnarumma", position: "GK", age: 27 },
      ]

    
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-press-start dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-row items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="w-full">
                    <div className="flex items-left justify-left mb-4">
                        <h6 className="text-4xl font-bold"> COLE PALMER </h6>
                        <Image
                        src="/players/cole_palmer.png"
                        alt="Palmer"
                        width={500}
                        height={500}
                        />
                    </div>
                    <div>
                        <h6 className="text-2xl flex items-center justify-center mb-4 font-bold"> STATS </h6>
                        <div>
                        <h6 className="text-1xl flex items-center justify-center mb-4 font-bold"> APPS: 20(2) </h6>
                        <h6 className="text-1xl flex items-center justify-center mb-4 font-bold"> AVG RATING: 7.11 </h6>
                        <h6 className="text-1xl flex items-center justify-center mb-4 font-bold"> GOALS: 10 </h6>
                        <h6 className="text-1xl flex items-center justify-center mb-4 font-bold"> ASSISTS: 3 </h6>
                        

                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
  }