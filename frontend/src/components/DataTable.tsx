import { useMemo, useState } from "react";

interface Column<T> {
  key: keyof T;
  title: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  searchableKeys?: (keyof T)[];
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  rowKey,
  searchableKeys = []
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [asc, setAsc] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = term
      ? rows.filter((row) =>
          searchableKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(term))
        )
      : rows;

    if (!sortBy) return list;

    return [...list].sort((a, b) => {
      const aVal = String(a[sortBy] ?? "");
      const bVal = String(b[sortBy] ?? "");
      return asc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }, [rows, search, searchableKeys, sortBy, asc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function toggleSort(key: keyof T) {
    if (sortBy === key) {
      setAsc((prev) => !prev);
      return;
    }
    setSortBy(key);
    setAsc(true);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 p-3">
        <input
          className="input max-w-xs"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Buscar..."
        />
        <p className="text-sm text-slate-500">{filtered.length} registros</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="cursor-pointer px-3 py-2 font-semibold text-slate-600"
                  onClick={() => toggleSort(col.key)}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row) => (
              <tr key={rowKey(row)} className="border-t border-slate-100">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-3 py-2 text-slate-700">
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 p-3">
        <button
          className="btn-secondary"
          disabled={currentPage <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Anterior
        </button>
        <span className="text-sm text-slate-500">
          Pagina {currentPage} de {totalPages}
        </span>
        <button
          className="btn-secondary"
          disabled={currentPage >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
