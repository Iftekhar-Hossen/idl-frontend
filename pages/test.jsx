import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { id: 1, name: "Item 1", category: "A" },
  { id: 2, name: "Item 2", category: "B" },
  { id: 3, name: "Item 3", category: "A" },
  { id: 4, name: "Item 4", category: "B" },
];

export default function FilteredList() {
  const [filter, setFilter] = useState("A");

  const filteredItems = items.filter((item) => item.category === filter);

  return (
    <div className="mt-28">
      <div>
        <button onClick={() => setFilter("A")}>Show A</button>
        <button onClick={() => setFilter("B")}>Show B</button>
      </div>

      <div className="flex gap-4">
        <AnimatePresence mode="wait">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "200px" }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden h-10"
            >
              <div className="rounded-lg bg-red-700 p-4 shadow-md">
                <h1>{item.name}</h1>
                <p>{item.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
