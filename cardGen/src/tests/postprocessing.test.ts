import { existsSync, readdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

import {
  postprocessTacticalCard,
  postprocessUnitCard,
} from "../postprocessing";

const getFixtureIds = (fixturesRoot: string): string[] => {
  if (!existsSync(fixturesRoot)) {
    return [];
  }

  return readdirSync(fixturesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
};

const testFixtureSet = <TRaw>(
  name: string,
  fixturesRoot: string,
  postprocess: (rawCard: TRaw) => unknown,
) => {
  const fixtureIds = getFixtureIds(fixturesRoot);

  describe(name, () => {
    test("has fixture folders", () => {
      expect(fixtureIds.length).toBeGreaterThan(0);
    });

    test.each(fixtureIds)("%s", async (cardId) => {
      const cardDir = path.join(fixturesRoot, cardId);
      const [rawJson, postprocessedJson] = await Promise.all([
        readFile(path.join(cardDir, "raw.json"), "utf8"),
        readFile(path.join(cardDir, "postprocessed.json"), "utf8"),
      ]);

      const rawCard = JSON.parse(rawJson) as TRaw;
      const expected = JSON.parse(postprocessedJson);
      const actual = JSON.parse(JSON.stringify(postprocess(rawCard)));

      expect(actual).toEqual(expected);
    });
  });
};

testFixtureSet(
  "Unit postprocessing",
  path.join(process.cwd(), "src", "tests", "units"),
  postprocessUnitCard,
);
testFixtureSet(
  "Tactical card postprocessing",
  path.join(process.cwd(), "src", "tests", "tacticalCards"),
  postprocessTacticalCard,
);
