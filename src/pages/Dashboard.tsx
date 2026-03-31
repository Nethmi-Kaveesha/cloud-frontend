import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Plus,
  Trash2,
  LayoutDashboard,
  FileUp,
  Loader2,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  username?: string;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [userRole, setUserRole] = useState("");

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses");
      const all = response.data || [];
      const role = localStorage.getItem("role") || "USER";
      const user = localStorage.getItem("username") || "";

      setCurrentUser(user);
      setUserRole(role);

      if (role === "ADMIN") {
        setExpenses(all);
      } else {
        setExpenses(all.filter((e: Expense) => e.username === user));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch expenses");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    setLoading(true);
    try {
      await api.post("/expenses", {
        title,
        description,
        amount: parseFloat(amount),
        username: currentUser,
      });

      setTitle("");
      setDescription("");
      setAmount("");
      fetchExpenses();
    } catch (err) {
      console.error(err);
      setError("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6 py-4 px-3 max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          Expense Tracker
        </h1>

        <div className="flex gap-2">
          <Link
            to="/dashboard/upload"
            className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-secondary"
          >
            <FileUp className="h-4 w-4" />
            Files
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-destructive/20 text-destructive"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* TOTAL */}
      <div className="text-lg font-semibold">
        Total: <span className="text-primary">Rs. {total.toFixed(2)}</span>
      </div>

      {/* ADD EXPENSE */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <form
          onSubmit={handleCreate}
          className="glassmorphism p-4 rounded-2xl space-y-3"
        >
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Plus className="h-5 w-5 text-primary" />
            New Expense
          </div>

          {error && <div className="text-xs text-destructive">{error}</div>}

          {/* SAME HEIGHT INPUTS */}
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="h-12 rounded-lg border px-3"
              required
            />

            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="h-12 rounded-lg border px-3"
            />

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="h-12 rounded-lg border px-3"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-primary text-white rounded-lg text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Add Expense"
            )}
          </button>
        </form>
      </motion.div>

      {/* EXPENSE LIST */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="glassmorphism rounded-2xl border overflow-hidden">
          <div className="p-3 font-semibold text-sm border-b">
            Expenses {userRole === "ADMIN" && "(Admin)"}
          </div>

          <div className="max-h-[400px] overflow-y-auto divide-y">
            {fetching ? (
              <div className="p-6 text-center">
                <Loader2 className="animate-spin mx-auto" />
              </div>
            ) : expenses.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No expenses yet
              </div>
            ) : (
              <AnimatePresence>
                {expenses.map((e) => (
                  <motion.div
                    key={e.id}
                    layout
                    className="flex items-center gap-3 p-3 text-sm"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{e.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {e.description}
                      </p>
                    </div>

                    <div className="font-semibold text-primary">
                      Rs. {e.amount.toFixed(2)}
                    </div>

                    <button onClick={() => handleDelete(e.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}