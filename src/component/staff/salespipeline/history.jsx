import React from "react";
import { Clock, Pencil, Trash2 } from "lucide-react";
export const HistoryList = ({ items = [], onEdit, onDelete }) => {
  const bg = ["bg-amber-50", "bg-blue-50", "bg-green-50", "bg-pink-50", "bg-purple-50", "bg-slate-50"];
  const fg = ["text-amber-700", "text-blue-700", "text-green-700", "text-pink-700", "text-purple-700", "text-slate-700"];
  const iconBg = ["bg-amber-100", "bg-blue-100", "bg-green-100", "bg-pink-100", "bg-purple-100", "bg-slate-100"];
  const iconFg = ["text-amber-600", "text-blue-600", "text-green-600", "text-pink-600", "text-purple-600", "text-slate-600"];
  const iconHoverBg = ["hover:bg-amber-200", "hover:bg-blue-200", "hover:bg-green-200", "hover:bg-pink-200", "hover:bg-purple-200", "hover:bg-slate-200"];
  if (items.length == 0) return null;
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="text-amber-500" size={16} />
        <h2 className="text-amber-500 font-semibold text-sm">History</h2>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center ${bg[index % bg.length]} ${fg[index % fg.length]} text-[13px] px-3 py-2.5 rounded`}
          >
            <span className="flex-1 pr-2">{item.text}</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => onEdit(index, item)}
                className={`${iconBg[index % iconBg.length]} ${iconFg[index % iconFg.length]} p-1.5 rounded ${iconHoverBg[index % iconHoverBg.length]} transition-colors`}
                title="Edit"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDelete(index, item)}
                className={`${iconBg[index % iconBg.length]} text-red-500 p-1.5 rounded ${iconHoverBg[index % iconHoverBg.length]} transition-colors`}
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};