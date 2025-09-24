import { useEffect, useState } from "react";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/get-orders")
      .then((r) => r.json())
      .then((data) => setOrders(data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Meal</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Event Date</th>
            <th className="border p-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td className="border p-2">{o.id}</td>
              <td className="border p-2">{o.name}</td>
              <td className="border p-2">{o.meal}</td>
              <td className="border p-2">{o.quantity}</td>
              <td className="border p-2">₹{o.total}</td>
              <td className="border p-2">{o.event_date}</td>
              <td className="border p-2">{new Date(o.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
