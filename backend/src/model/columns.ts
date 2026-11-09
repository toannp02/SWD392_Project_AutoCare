/*
 * Class Name: Columns
 * Version: 2026-11-09
 * Copyright notice: Nguyen Phu Toan - He191566
 */

import { ValueTransformer } from 'typeorm';

/** PostgreSQL BIGINT / NUMERIC are returned as strings by `pg`; map them to JS numbers. */
export const numeric: ValueTransformer = {
  to: (v: unknown) => v,
  from: (v: string | null) => (v === null || v === undefined ? v : Number(v)),
};
