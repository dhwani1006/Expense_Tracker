import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../redux/expenseSlice";

function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !date) return;

    dispatch({
      type: "expenses/addExpense/pending"
    });

    dispatch(addExpense({ amount: Number(amount), category, date }));

    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}

export default ExpenseForm;