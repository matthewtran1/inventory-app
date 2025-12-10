

export default function Inventory() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center py-8 px-8  dark:bg-black sm:items-start">
        <div className=" bg-white w-full mb-8 px-6 py-4 rounded-lg shadow">
            <div className="flex justify-between">
                <div className="text-3xl font-semibold">
                    Inventory
                </div>
                <div className="text-3xl font-semibold cursor-pointer px-2 rounded hover:bg-blue-500 hover:text-white transition-colors">
                    +
                </div>
            </div>
            
            <div className="mt-2">
                <p>Manage your inventory!</p>
            </div>
           
        </div>

        {/* Fridge Section */}
        <div className=" bg-white w-full mb-8 px-6 py-4 rounded-lg shadow">
            <div className="flex justify-between">
                <div className="text-3xl font-semibold">
                    Fridge
                </div>
                <div className="text-3xl font-semibold cursor-pointer px-2 rounded hover:bg-blue-500 hover:text-white transition-colors">
                    +
                </div>
            </div>

            
          
        </div>
        
        {/* Freezer Section */}
        <div className=" bg-white w-full mb-8 px-6 py-4 rounded-lg shadow">
            <div className="flex justify-between">
                <div className="text-3xl font-semibold">
                    Freezer
                </div>
                <div className="text-3xl font-semibold cursor-pointer px-2 rounded hover:bg-blue-500 hover:text-white transition-colors">
                    +
                </div>
            </div>
        </div>

        {/* Pantry Section */}
        <div className=" bg-white w-full mb-8 px-6 py-4 rounded-lg shadow">

            <div className="flex justify-between">
                <div className="text-3xl font-semibold">
                    Pantry
                </div>
                <div className="text-3xl font-semibold cursor-pointer px-2 rounded hover:bg-blue-500 hover:text-white transition-colors">
                    +
                </div>
            </div>
          
        </div>

      </main>
    </div>
  );
}
