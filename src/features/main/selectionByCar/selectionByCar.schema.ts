import { z } from 'zod';

export type TSelectionByCar = z.infer<typeof selectionByCarSchema>;

export const selectionByCarSchema = z.object({
  year: z.number().optional(),
  mark: z.string().optional(),
  model: z.string().optional(),
  modification: z.string().optional(),
});
