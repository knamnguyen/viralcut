import { useMutation } from "@tanstack/react-query";

const WORKER_BASE_URL =
  "https://gemini-upload-cf-worker.tutuhub-malaysia.workers.dev";

function upload(
  url: string,
  file: File,
  opts?: { onProgress?: (percentage: number) => void },
) {
  const xhr = new XMLHttpRequest();

  return new Promise<{ fileUri: string }>((resolve, reject) => {
    const { onProgress } = opts ?? {};

    if (onProgress) {
      // Track upload progress
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          onProgress(percent);
        }
      });
    }

    // Handle completion
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const json = JSON.parse(xhr.responseText) as { fileUri?: string };
          if (json.fileUri) {
            resolve({ fileUri: json.fileUri });
          } else {
            reject(new Error("No file URI returned from upload"));
          }
        } catch {
          return reject(new Error("Failed to parse response"));
        }
      } else {
        reject(new Error(`Upload failed: ${xhr.status}`));
      }
    });

    // Handle errors
    xhr.addEventListener("error", () => {
      reject(new Error("Network error"));
    });

    // Start upload
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Length", file.size.toString());
    xhr.setRequestHeader("X-Goog-Upload-Offset", "0");
    xhr.setRequestHeader("X-Goog-Upload-Command", "upload, finalize");
    xhr.send(file);
  });
}

export const useGeminiUploadCfWorker = () => {
  return useMutation({
    mutationFn: async ({
      file,
      onProgress,
    }: {
      file: File;
      onProgress?: (percent: number) => void;
    }) => {
      const response = await fetch(`${WORKER_BASE_URL}/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type,
          fileSize: file.size,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = (await response.json()) as { uploadUrl?: string };
      const uploadUrl = data.uploadUrl;
      if (uploadUrl === undefined) {
        throw new Error("No upload URL returned from worker");
      }

      return await upload(uploadUrl, file, {
        onProgress,
      });
    },
  });
};
