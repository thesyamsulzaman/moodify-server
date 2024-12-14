import { PrismaClient } from "@prisma/client";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";

import prisma from "./src/db";
import resetDb from "./src/helpers/reset-db";

// jest.mock("./src/db", () => ({
//   __esModule: true,
//   default: mockDeep<PrismaClient>(),
// }));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(async () => {
  await resetDb();
});
