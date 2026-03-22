import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchExpenses } from "./redux/expenseSlice";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
}

export default App;