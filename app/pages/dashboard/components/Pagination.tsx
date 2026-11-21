import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { Pagination as PaginationType } from '../types';

type PaginationProps = {
  pagination: PaginationType;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export default function Pagination({
  pagination,
  limit,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const { page, totalPages, total } = pagination;

  return (
    <div className="dashboard-pagination">
      <span className="dashboard-pagination-total">
        {total} baris · halaman {page} dari {totalPages}
      </span>
      <div className="dashboard-pagination-controls">
        <label className="dashboard-limit">
          <span>Per halaman</span>
          <select
            value={String(limit)}
            onChange={(event) => onLimitChange(Number(event.target.value))}
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Halaman sebelumnya"
        >
          <ChevronLeft size={15} />
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Halaman berikutnya"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
