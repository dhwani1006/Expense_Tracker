import { useSelector, useDispatch } from "react-redux";
import { deleteExpense, updateExpense } from "../redux/expenseSlice";
import { useState } from "react";

function ExpenseList() {
  const expenses = useSelector((state) => state.expenses.list);
  const dispatch = useDispatch();

  const [openDate, setOpenDate] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    amount: "",
    category: "",
    date: "",
  });

  const grouped = expenses.reduce((acc, item) => {
    if (filterDate && item.date !== filterDate) return acc;
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  const total = expenses.reduce((sum, item) => {
    if (filterDate && item.date !== filterDate) return sum;
    return sum + (Number(item.amount) || 0);
  }, 0);

  const getDateTotal = (items) => {
    return items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditData(item);
  };

  const saveEdit = (id) => {
    dispatch(
      updateExpense({
        id,
        data: {
          ...editData,
          amount: Number(editData.amount),
        },
      })
    );
    setEditId(null);
  };

  return (
    <div>
      <div className="filter-bar">
        <div className="filter-box">
          <span>🔍</span>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      <h3>Total: ₹{total}</h3>

      {Object.keys(grouped).map((date) => (
        <div key={date} className="date-group">
          <div
            className="date-header"
            onClick={() => setOpenDate(openDate === date ? null : date)}
          >
            <span>
              {date} (₹{getDateTotal(grouped[date])})
            </span>
            <span>{openDate === date ? "▲" : "▼"}</span>
          </div>

          {openDate === date &&
            grouped[date].map((item) => (
              <div key={item.id} className="expense-item">
                {editId === item.id ? (
                  <div style={{ width: "100%" }}>
                    <div className="edit-form">
                      <input
                        type="number"
                        value={editData.amount}
                        onChange={(e) =>
                          setEditData({ ...editData, amount: e.target.value })
                        }
                      />
                      <input
                        value={editData.category}
                        onChange={(e) =>
                          setEditData({ ...editData, category: e.target.value })
                        }
                      />
                      <input
                        type="date"
                        value={editData.date}
                        onChange={(e) =>
                          setEditData({ ...editData, date: e.target.value })
                        }
                      />
                      <button onClick={() => saveEdit(item.id)}>Save</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      ₹{item.amount} - {item.category}
                    </div>

                    <div className="actions">
                      <button
                        className="edit-btn"
                        onClick={() => startEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => dispatch(deleteExpense(item.id))}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;