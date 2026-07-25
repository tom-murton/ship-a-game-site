import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const games = defineCollection({
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/README.md'], base: './content/games' }),
  schema: z.object({
    title: z.string(),
    model: z.string(),
    harness: z.string(),
    engine: z.string(),
    date: z.coerce.date(),
    statusLabel: z.string(),
    autonomyScore: z.string(),
    interventions: z.number().int().nonnegative(),
    round2Score: z.string().optional(),
    round2Interventions: z.number().int().nonnegative().optional(),
    round3Score: z.string().optional(),
    round3Interventions: z.number().int().nonnegative().optional(),
    round2Model: z.string().optional(),
    timeToShip: z.string().optional(),
    runCost: z.string().optional(),
    qualityRating: z.string().optional(),
    playtestVerdict: z.string(),
    extraPrompts: z.number().int().nonnegative(),
    appStoreUrl: z.url(),
    sourceUrl: z.url().optional(),
    price: z.string(),
    appleOutcome: z.string(),
    protocolNote: z.string().optional(),
    coverImage: z.string(),
    coverAlt: z.string(),
    screenshots: z.array(z.string()).default([]),
    summary: z.string(),
  }),
});

export const collections = { games };
