import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "bun:test";

import { GeminiUploadClient } from "../gemini-client";

const geminiUploadClient = new GeminiUploadClient("...");

test("initiate and upload", async () => {
  const fileBuffer = readFileSync(join(import.meta.dirname, "fixture.mp4"));
  const file = new File([fileBuffer], "fixture.mp4", { type: "video/mp4" });
  const upload = await geminiUploadClient.initiate(
    file.name,
    file.type,
    file.size,
  );
  expect(upload.success).toBeTrue();
  expect(upload.uploadUrl).toBeDefined();

  const res = await geminiUploadClient.upload(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    upload.uploadUrl!,
    file.size,
    file.stream(),
  );
  expect(res.success).toBe(true);
  expect(res.fileUri).toBeDefined();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const exists = await geminiUploadClient.getFileByUri(res.fileUri!);
  expect(exists.success).toBeTrue();
  expect(exists.data?.displayName).toBe(file.name);
  expect(exists.data?.mimeType).toBe(file.type);
}, 10000);
