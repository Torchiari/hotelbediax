import { useState, useEffect } from "react";

type Props = {
  initial?: any;
  open: boolean;
  onClose: () => void;
  onSave: (payload: any) => Promise<void>;
};

export default function DestinationFormModal({ initial = null, open, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    country: "",
    region: "",
    rating: 0
  });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name ?? "",
        description: initial.description ?? "",
        country: initial.country ?? "",
        region: initial.region ?? "",
        rating: initial.rating ?? 0
      });
    } else {
      setForm({ name: "", description: "", country: "", region: "", rating: 0 });
    }
  }, [initial, open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave(form);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col gap-4">
        <h3 className="text-xl font-bold">{initial ? "Modify destination" : "Create destination"}</h3>

        <div className="grid grid-cols-1 gap-3">
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Country"
            value={form.country}
            onChange={e => setForm({ ...form, country: e.target.value })}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Region"
            value={form.region}
            onChange={e => setForm({ ...form, region: e.target.value })}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Rating"
            type="number"
            step="0.1"
            value={String(form.rating)}
            onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Short description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Save</button>
        </div>
      </form>
    </div>
  );
}
