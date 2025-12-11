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
  return (
    
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
        <div className="text-lg font-medium">{itemName}</div>
        <div className="text-gray-600 text-sm">Entered: {enteredDate}</div>
        <div className="text-gray-600 text-sm">Expires: {expiryDate}</div>
        <div className="text-gray-600 text-sm">Notes: {notes}</div>
    </div>

  )
}