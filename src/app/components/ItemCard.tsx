// Item component
type ItemCardProps = {
  id?: number;
  itemName: string;
  enteredDate: string;
  expiryDate: string;
  notes: string;
  amount?: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};


export default function ItemCard(
  { id, itemName, amount, enteredDate, expiryDate, notes, onEdit, onDelete }: ItemCardProps
) {

  // Calculate expiry status
  const entered = new Date(enteredDate)
  const expired = new Date(expiryDate)

  const diffTime = expired.getTime() - entered.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  function checkExpiryStatus() {
    if (diffDays <= 0) {
      return "expired";           // expired or expiring today
    } else if (diffDays <= 5) {
      return "expiring-soon";     // 1–5 days remaining
    } else {
      return "fresh";             // more than 3 days left
    }
  }

  const expiryStatus = checkExpiryStatus();

  const statusColors = {
    fresh: "bg-green-50 border-green-500",
    "expiring-soon": "bg-yellow-50 border-yellow-500",
    expired: "bg-red-50 border-red-500",
  };


  return (
    
    <div className="relative border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
      <div className="flex justify-between">
        <div className="text-lg font-medium">{itemName}</div>
        <div className="flex flex-col justify-between items-center h-full">
          <div className={`border rounded-lg p-4 transition ${statusColors[expiryStatus]}`}></div>
        </div>
      </div>

      {/* Amount Bar */}
      <div className="mt-2">
        <label className="text-sm text-gray-600">Amount: {amount ?? 0}%</label>
        <div className="w-full h-4 bg-gray-200 rounded my-1">
          <div
            className={`h-4 rounded ${
              (amount ?? 0) > 50 ? "bg-green-500" : (amount ?? 0) > 20 ? "bg-yellow-500" : "bg-red-500"
            }`}
            style={{ width: `${amount ?? 0}%` }}
          ></div>
        </div>
      </div>

      {/* Other Details */}
      <div className="text-gray-600 text-sm">Entered: {enteredDate}</div>
      <div className="text-gray-600 text-sm">Expires: {expiryDate}</div>
      <div className="text-gray-600 text-sm">Notes: {notes}</div>

      {/* Edit and Delete Buttons */}
      <div className="flex justify-between mt-2">
        { id !== undefined && (
        <button
          className="border rounded-lg py-1 px-4 text-gray-500 hover:text-blue-500 cursor-pointer"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>
        )}

        { id !== undefined && (
          <button
            className="border rounded-lg py-1 px-4 text-gray-500 hover:text-blue-500 cursor-pointer"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>

  )
}