import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function OrderModal({ meal, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [eventDate, setEventDate] = useState("");
  const [loading, setLoading] = useState(false);

  // validation helpers
  const isEventDateValid = () => {
    if (!eventDate) return false;
    const selected = new Date(eventDate);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 30); // must be at least 30 days from today
    return selected >= minDate;
  };

  const priceNumber = Number(String(meal.price).replace(/[^0-9.]/g, "")) || 0;
  const total = (priceNumber * Number(quantity || 0)).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEventDateValid()) {
      alert("Please choose an event date at least 30 days from today.");
      return;
    }
    setLoading(true);

    const { error } = await supabase.from("orders").insert([
      {
        name,
        email,
        phone,
        meal: meal.name,
        price: meal.price,
        quantity: Number(quantity),
        total: total,
        event_date: eventDate,
        details: `Meal ${meal.name} x ${quantity}`
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error placing order: " + error.message);
      return;
    }

    // call backend email sender (optional)
    try {
      await fetch("/api/send-order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone, meal: meal.name, quantity, total, eventDate
        }),
      });
    } catch (err) {
      // non-blocking
      console.warn("Email send failed:", err);
    }

    alert("Order placed successfully! We will contact you shortly.");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500">✕</button>
        <h2 className="text-xl font-bold mb-4">Order {meal.name}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={name} onChange={(e)=>setName(e.target.value)} required placeholder="Your name"
            className="w-full border rounded p-2" />

          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required placeholder="Email"
            className="w-full border rounded p-2" />

          <input value={phone} onChange={(e)=>setPhone(e.target.value)} required placeholder="Phone"
            className="w-full border rounded p-2" />

          <div className="flex gap-2">
            <input value={quantity} onChange={(e)=>setQuantity(e.target.value)} min="1" type="number"
              className="w-1/2 border rounded p-2" />
            <input value={eventDate} onChange={(e)=>setEventDate(e.target.value)} type="date"
              className="w-1/2 border rounded p-2" />
          </div>

          <div className="text-sm text-gray-600">Price: {meal.price} • Total: ₹{total}</div>

          <button type="submit" disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
            {loading ? "Placing..." : `Place Order — ₹${total}`}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-3">
          Bulk orders only. Place order at least 30 days before event. Advance payment required 15 days before.
        </p>
      </div>
    </div>
  );
}
