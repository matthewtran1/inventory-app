// Item component
type ItemCardProps = {
  itemName: string;
  enteredDate: string;
  expiryDate: string;
  notes: string;
};


export default function ItemCard(
  { itemName, enteredDate, expiryDate, notes }: ItemCardProps
) {

  // Calculate expiry status
  const entered = new Date(enteredDate)
  const expired = new Date(expiryDate)

  const diffTime = expired.getTime() - entered.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  function checkExpiryStatus() {
    if (diffDays <= 0) {
      return "expired";           // expired or expiring today
    } else if (diffDays <= 3) {
      return "expiring-soon";     // 1–3 days remaining
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
    
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
      <div className="flex justify-between">
        <div className="text-lg font-medium">{itemName}</div>
        <div className={`border rounded-lg p-4 transition ${statusColors[expiryStatus]}`}></div>
      </div>
      <div className="text-gray-600 text-sm">Entered: {enteredDate}</div>
      <div className="text-gray-600 text-sm">Expires: {expiryDate}</div>
      <div className="text-gray-600 text-sm">Notes: {notes}</div>
    </div>

  )
}