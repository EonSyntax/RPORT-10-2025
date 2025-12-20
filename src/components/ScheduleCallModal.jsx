import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";

const hoursRange = (start = 8, end = 18) => {
  const arr = [];
  for (let h = start; h <= end; h++) {
    for (let m of ["00", "15", "30", "45"]) {
      arr.push(`${h.toString().padStart(2, "0")}:${m}`);
    }
  }
  return arr;
};

const ScheduleCallModal = ({ open, onClose, prefill = {}, onSuccess }) => {
  const [name, setName] = useState(prefill.name || "");
  const [phone, setPhone] = useState(prefill.phone || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const timeRef = useRef(null);
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const listRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    const onDown = (e) => {
      if (!timeRef.current) return;
      if (showTimeMenu && !timeRef.current.contains(e.target))
        setShowTimeMenu(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setShowTimeMenu(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [showTimeMenu]);

  useEffect(() => {
    if (open) {
      setPhone(prefill.phone || "");
      // default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const iso = tomorrow.toISOString().slice(0, 10);
      setDate(iso);
      setCurrentMonth(new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1));
      setTime("09:00");
      setError("");
    }
  }, [open, prefill]);

  const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
  const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0);

  const daysForMonth = (monthDate) => {
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    const days = [];
    // get weekday of first day (0=Sun)
    const lead = start.getDay();
    // previous month fill
    for (let i = 0; i < lead; i++) days.push(null);
    for (let d = 1; d <= end.getDate(); d++)
      days.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), d));
    return days;
  };

  const formatISO = (d) => d.toISOString().slice(0, 10);

  const isSelectable = (d) => {
    if (!d) return false;
    const year = d.getFullYear();
    if (year < 2025 || year > 2026) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // allow today and future
    return d >= today;
  };

  const validate = () => {
    const nameValid = name && name.trim().length > 0;
    if (!nameValid) return "Please enter your name.";
    if (!phone || phone.trim().length < 7)
      return "Please enter a valid phone number.";
    if (!date) return "Please select a date.";
    if (!time) return "Please select a time.";
    // ensure date within 2025-2026
    const d = new Date(date);

    // Manage focus inside the time list when it opens or focusedIndex changes
    const year = d.getFullYear();
    if (year < 2025 || year > 2026)
      return "Please select a date in 2025 or 2026.";
    return "";
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    setError("");
    const v = validate();
    if (v) return setError(v);

    setIsSending(true);
    try {
      const payload = {
        name: name || prefill.name || "",
        phone,
        date,
        time,
      };

      const res = await emailjs.send(
        "service_id09y6r",
        "template_3tf5bik",
        payload
      );

      if (res.status === 200) {
        onSuccess &&
          onSuccess({
            title: "Call Request Sent",
            body: `A call request for ${date} at ${time} was sent.`,
          });
        onClose();
      } else {
        setError("Failed to send. Try again later.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send. Try again later.");
    } finally {
      setIsSending(false);
    }
  };

  const times = hoursRange();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.form
            initial={{ scale: 0.95, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 8 }}
            transition={{ type: "spring", duration: 0.35 }}
            className="w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium">Schedule a Call</h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X />
              </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Choose a date and time that works for you — I'll follow up to talk
              about your Project.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
              <div className="flex flex-col space-y-3">
                <label className="flex flex-col">
                  <span className="text-sm mb-1">Your name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm mb-1">Phone number</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555 555 5555"
                    className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  />
                </label>
              </div>

              <div className="flex flex-col">
                <span className="text-sm mb-2">Date</span>
                <div className="border rounded-lg p-3 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentMonth(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth() - 1,
                              1
                            )
                          )
                        }
                        className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Previous month"
                      >
                        ‹
                      </button>
                      <div className="font-medium">
                        {currentMonth.toLocaleString(undefined, {
                          month: "long",
                        })}{" "}
                        {currentMonth.getFullYear()}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentMonth(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth() + 1,
                              1
                            )
                          )
                        }
                        className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Next month"
                      >
                        ›
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-xs text-center text-gray-500 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (d) => (
                        <div key={d}>{d}</div>
                      )
                    )}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {daysForMonth(currentMonth).map((d, idx) => {
                      const selectable = d && isSelectable(d);
                      const iso = d ? formatISO(d) : null;
                      const selected = iso === date;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectable && setDate(iso)}
                          disabled={!selectable}
                          className={`w-full h-8 flex items-center justify-center rounded ${
                            selected
                              ? "bg-blue-500 text-white"
                              : selectable
                              ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                              : "opacity-30 cursor-not-allowed"
                          }`}
                        >
                          {d ? d.getDate() : ""}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <label className="flex flex-col md:col-span-2 sm:col-span-2">
                <span className="text-sm mb-1">Time</span>
                <div className="relative" ref={(el) => (timeRef.current = el)}>
                  <button
                    type="button"
                    onClick={() => setShowTimeMenu((s) => !s)}
                    aria-haspopup="listbox"
                    aria-expanded={showTimeMenu}
                    className="w-full text-left px-3 py-2 rounded-lg border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  >
                    {time || "Select time"}
                  </button>

                  {showTimeMenu && (
                    <ul
                      role="listbox"
                      tabIndex={-1}
                      style={{ bottom: "calc(100% + 0.25rem)" }}
                      className="absolute left-0 right-0 max-h-40 overflow-auto rounded border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 z-50"
                    >
                      {times.map((t) => (
                        <li key={t}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setTime(t);
                              setShowTimeMenu(false);
                            }}
                            className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-transform ${
                              t === time ? "bg-blue-500 text-white" : ""
                            }`}
                          >
                            {t}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </label>
            </div>

            {error && <div className="mt-4 text-sm text-red-500">{error}</div>}

            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white"
              >
                {isSending ? "Sending..." : "Request Call"}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScheduleCallModal;
