import type { StockState } from "@/lib/products";

const dotColor: Record<StockState["status"], string> = {
  in_stock: "bg-success",
  low_stock: "bg-danger",
  out_of_stock: "bg-subtle",
};

export function StockStatus({ state }: { state: StockState }) {
  return (
    <p className="flex items-center gap-2 text-caption">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dotColor[state.status]}`} />
      <span className={state.status === "out_of_stock" ? "text-muted" : undefined}>
        {state.label}
      </span>
    </p>
  );
}
