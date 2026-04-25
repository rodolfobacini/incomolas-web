"use client";

import { CATEGORIES, MATERIAIS, ACABAMENTOS, DISPONIBILIDADES } from "@/lib/categories";
import { Button } from "../ui/Button";

export interface FilterState {
  cats: string[];
  materiais: string[];
  acabamentos: string[];
  disp: string[];
  q: string;
  priceMax: number;
  wireMin: number;
  wireMax: number;
}

export const INITIAL_FILTER: FilterState = {
  cats: [],
  materiais: [],
  acabamentos: [],
  disp: [],
  q: "",
  priceMax: 500,
  wireMin: 1,
  wireMax: 12,
};

export function Sidebar({
  filter,
  setFilter,
}: {
  filter: FilterState;
  setFilter: (f: FilterState) => void;
}) {
  const toggle = (k: keyof FilterState, v: string) => {
    const arr = filter[k] as string[];
    setFilter({
      ...filter,
      [k]: arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v],
    });
  };

  return (
    <aside className="md:sticky md:top-[113px] self-start">
      <div className="flex items-center gap-2.5 bg-bg-3 border-[1.5px] border-[var(--border)] rounded-md px-3.5 py-2.5 mb-5 focus-within:border-[var(--accent)] transition-colors">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-3)"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className="bg-transparent border-0 outline-none text-text-1 font-body text-[14px] w-full placeholder:text-text-3"
          type="text"
          placeholder="Buscar mola..."
          value={filter.q}
          onChange={(e) => setFilter({ ...filter, q: e.target.value })}
        />
      </div>

      <FilterBlock
        title="Categoria"
        onClear={() => setFilter({ ...filter, cats: [] })}
      >
        {CATEGORIES.filter((c) => c.key !== "todos").map((c) => (
          <Check
            key={c.key}
            label={c.label}
            count={c.count}
            checked={filter.cats.includes(c.key)}
            onChange={() => toggle("cats", c.key)}
          />
        ))}
      </FilterBlock>

      <FilterBlock
        title="Material"
        onClear={() => setFilter({ ...filter, materiais: [] })}
      >
        {MATERIAIS.map((m) => (
          <Check
            key={m.value}
            label={m.value}
            count={m.count}
            checked={filter.materiais.includes(m.value)}
            onChange={() => toggle("materiais", m.value)}
          />
        ))}
      </FilterBlock>

      <FilterBlock
        title="Acabamento"
        onClear={() => setFilter({ ...filter, acabamentos: [] })}
      >
        {ACABAMENTOS.map((a) => (
          <Check
            key={a.value}
            label={a.value}
            count={a.count}
            checked={filter.acabamentos.includes(a.value)}
            onChange={() => toggle("acabamentos", a.value)}
          />
        ))}
      </FilterBlock>

      <FilterBlock title="Diâmetro do Arame">
        <div className="flex justify-between mb-2.5">
          <span className="font-mono text-[12px] text-text-2">
            {filter.wireMin.toFixed(1).replace(".", ",")} mm
          </span>
          <span className="font-mono text-[12px] text-text-2">
            {filter.wireMax.toFixed(1).replace(".", ",")} mm
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={12}
          step={0.5}
          value={filter.wireMin}
          onChange={(e) =>
            setFilter({ ...filter, wireMin: parseFloat(e.target.value) })
          }
        />
        <input
          type="range"
          min={1}
          max={12}
          step={0.5}
          value={filter.wireMax}
          onChange={(e) =>
            setFilter({ ...filter, wireMax: parseFloat(e.target.value) })
          }
          style={{ marginTop: 8 }}
        />
      </FilterBlock>

      <FilterBlock
        title="Disponibilidade"
        onClear={() => setFilter({ ...filter, disp: [] })}
      >
        {DISPONIBILIDADES.map((d) => (
          <Check
            key={d.value}
            label={d.label}
            count={d.count}
            checked={filter.disp.includes(d.value)}
            onChange={() => toggle("disp", d.value)}
          />
        ))}
      </FilterBlock>

      <FilterBlock title="Faixa de Preço" last>
        <div className="flex justify-between mb-2.5">
          <span className="font-mono text-[12px] text-text-2">R$ 0</span>
          <span className="font-mono text-[12px] text-text-2">
            R$ {filter.priceMax}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={500}
          step={10}
          value={filter.priceMax}
          onChange={(e) =>
            setFilter({ ...filter, priceMax: parseInt(e.target.value, 10) })
          }
        />
      </FilterBlock>

      <div className="mt-5 pt-5 border-t border-[var(--border)]">
        <Button
          variant="ghost"
          className="w-full justify-center"
          onClick={() => setFilter(INITIAL_FILTER)}
        >
          Limpar todos os filtros
        </Button>
      </div>
    </aside>
  );
}

function FilterBlock({
  title,
  children,
  onClear,
  last,
}: {
  title: string;
  children: React.ReactNode;
  onClear?: () => void;
  last?: boolean;
}) {
  return (
    <div
      className={`mb-7 pb-7 ${last ? "border-0 pb-0 mb-0" : "border-b border-[var(--border)]"}`}
    >
      <div className="flex items-center justify-between mb-3.5">
        <div className="font-display text-[11px] font-bold tracking-[0.14em] uppercase text-text-3">
          {title}
        </div>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="font-display text-[10px] tracking-[0.08em] uppercase bg-transparent border-0 cursor-pointer"
            style={{ color: "var(--accent)" }}
          >
            Limpar
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Check({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer py-1 group">
      <input type="checkbox" className="cb" checked={checked} onChange={onChange} />
      <span className="font-body text-[14px] text-text-2 group-hover:text-text-1 transition-colors">
        {label}
      </span>
      <span className="ml-auto font-mono text-[11px] text-text-3">{count}</span>
    </label>
  );
}
