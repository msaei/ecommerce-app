"use client";

import { useState } from "react";

import { HeartIcon } from "@/components/icons";
import { StockStatus } from "@/components/product/stock-status";
import { getStockState, totalStock, type Product, type StockState } from "@/lib/products";

export function PurchasePanel({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const available = totalStock(product);
  const soldOut = available === 0;
  const size = product.sizes?.find((s) => s.label === selectedSize);

  // Sized products report stock for the chosen size; otherwise for the whole product.
  let stockState: StockState;
  if (size) stockState = getStockState(size.stock);
  else if (product.sizes && !soldOut) stockState = { status: "in_stock", label: "In stock" };
  else stockState = getStockState(available);

  function handleAddToBag() {
    if (product.sizes && !size) {
      setMessage("Please select a size.");
      return;
    }
    // TODO: connect to the cart.
    setMessage("The shopping bag isn't connected yet.");
  }

  return (
    <div className="flex flex-col gap-6">
      {product.sizes && (
        <fieldset className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <legend className="eyebrow float-left">Size</legend>
            <a href="#" className="link-subtle text-caption text-muted">
              Size guide
            </a>
          </div>
          <div className="grid grid-cols-4 gap-1 sm:grid-cols-6 lg:grid-cols-4">
            {product.sizes.map((option) => {
              const unavailable = option.stock === 0;
              return (
                <label key={option.label} className="relative">
                  <input
                    type="radio"
                    name="size"
                    value={option.label}
                    disabled={unavailable}
                    checked={selectedSize === option.label}
                    onChange={() => {
                      setSelectedSize(option.label);
                      setMessage(null);
                    }}
                    className="peer sr-only"
                  />
                  <span className="flex h-12 cursor-pointer items-center justify-center border border-line text-caption transition-colors duration-200 hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink peer-disabled:cursor-not-allowed peer-disabled:border-line peer-disabled:text-subtle peer-disabled:line-through">
                    {option.label}
                  </span>
                  {unavailable && <span className="sr-only">(sold out)</span>}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <StockStatus state={stockState} />

      <div className="flex gap-1">
        {soldOut ? (
          <button
            type="button"
            className="btn btn-secondary flex-1"
            onClick={() => setMessage("Stock alerts aren't connected yet.")}
          >
            Notify me when available
          </button>
        ) : (
          <button type="button" className="btn flex-1" onClick={handleAddToBag}>
            Add to bag
          </button>
        )}
        <button
          type="button"
          aria-label={`Save ${product.name}`}
          className="btn btn-secondary btn-icon"
        >
          <HeartIcon />
        </button>
      </div>

      <p role="status" className="min-h-[1.5em] text-caption text-muted">
        {message}
      </p>
    </div>
  );
}
