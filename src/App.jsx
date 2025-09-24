import { useState } from "react";
import OrderModal from "./OrderModal";

export default function App() {
  const [selectedMeal, setSelectedMeal] = useState(null);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center">
      <header className="w-full bg-green-600 text-white p-6 text-center text-3xl font-bold">Mohan Catering</header>
      <p className="mt-4 text-xl text-gray-700 text-center max-w-xl px-4">Delicious Veg & Non-Veg Combo Meals for Bulk Orders</p>

      <section className="mt-8 w-full max-w-5xl px-4">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Veg Meals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <MealCard name="11-Course Meal" price="₹400" color="green" onOrder={setSelectedMeal} />
          <MealCard name="17-Course Meal" price="₹500" color="green" onOrder={setSelectedMeal} />
          <MealCard name="19-Course Meal" price="₹600" color="green" onOrder={setSelectedMeal} />
        </div>
      </section>

      <section className="mt-12 w-full max-w-5xl px-4">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Non-Veg Meals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <MealCard name="11-Course Meal" price="₹700" color="red" onOrder={setSelectedMeal} />
          <MealCard name="13-Course Meal" price="₹800" color="red" onOrder={setSelectedMeal} />
          <MealCard name="15-Course Meal" price="₹900" color="red" onOrder={setSelectedMeal} />
        </div>
      </section>

      <footer className="mt-12 bg-gray-100 w-full text-center p-6 text-gray-700">
        <p>Bulk orders only. Place order 30 days in advance.</p>
        <p>Advance payment required 15 days before the event.</p>
      </footer>

      {selectedMeal && <OrderModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />}
    </div>
  );
}

function MealCard({ name, price, color, onOrder }) {
  const headerColor = color === "green" ? "text-green-700" : "text-red-600";
  return (
    <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
      <div>
        <h3 className={`font-bold text-lg ${headerColor}`}>{name}</h3>
        <p className="mt-2 text-gray-700">{price} per plate</p>
      </div>
      <button onClick={() => onOrder({ name, price })} className={`mt-4 px-4 py-2 rounded-md text-white font-semibold ${color === "green" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}>
        Order Now
      </button>
    </div>
  );
}
