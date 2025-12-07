import { useState, useEffect } from "react";
import { createDestination, updateDestination, deleteDestination } from "../api/destinations";
import DestinationFormModal from "./DestinationFormModal";


export default function DestinationsTable({
  items: initialItems,
  total,
  onRefresh,
  page,
  pageSize
}: {
  items: any[];
  total: number;
  onRefresh: () => void;
  page: number;
  pageSize: number;
}) {
  const [items, setItems] = useState(initialItems);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  async function handleCreate(payload: any) {
    await createDestination(payload);
    setModalOpen(false);
    onRefresh();
  }

  async function handleUpdate(payload: any) {
    if (!editing) return;

    await updateDestination(editing.id, payload);

    setItems(prev =>
      prev.map(item =>
        item.id === editing.id
          ? { ...item, ...payload, updatedAt: new Date().toISOString() }
          : item
      )
    );

    setModalOpen(false);
    setEditing(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar destino?")) return;
    await deleteDestination(id);
    onRefresh();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-medium">Total: {total}</span>

        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={() => { setEditing(null); setModalOpen(true); }}
        >
          + Create
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-md overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">Region</th>
              <th className="px-4 py-2 text-left">Rating</th>
              <th className="px-4 py-2 text-left">Last modified</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {items.map((it, index) => (
              <tr key={it.id} className="border-b border-gray-200">
                <td className="px-4 py-2">{(page - 1) * pageSize + index + 1}</td>
                <td className="px-4 py-2">{it.name}</td>
                <td className="px-4 py-2">{it.description}</td>
                <td className="px-4 py-2">{it.country}</td>
                <td className="px-4 py-2">{it.region}</td>
                <td className="px-4 py-2">{it.rating ?? "-"}</td>
                <td className="px-4 py-2">
                  {new Date(it.updatedAt ?? it.createdAt).toLocaleString()}
                </td>

                <td className="px-4 py-2 text-center flex justify-center gap-2">
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    onClick={() => { setEditing(it); setModalOpen(true); }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={() => handleDelete(it.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DestinationFormModal
        open={modalOpen}
        initial={editing}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={(payload) => {
          if (editing) return handleUpdate(payload);
          return handleCreate(payload);
        }}
      />
    </div>
  );
}
