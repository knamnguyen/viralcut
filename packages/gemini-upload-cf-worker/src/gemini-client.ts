const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com";

interface GeminiFileResponse {
  name: string;
  displayName: string;
  mimeType: string;
  sizeBytes: string;
  createTime: string;
  updateTime: string;
  expirationTime: string;
  sha256Hash: string;
  uri: string;
  state: string;
  videoMetadata: {
    videoDuration: string;
  };
  source: string;
}

export class GeminiUploadClient {
  private apiKey?: string;
  constructor(apiKey?: string) {
    if (apiKey !== undefined) {
      this.apiKey = apiKey;
    }
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  async initiate(fileName: string, mimeType: string, fileSize: number) {
    if (this.apiKey === undefined) {
      throw new Error("API key is required to initiate upload");
    }

    // Step 1: Start resumable upload session with Gemini
    const response = await fetch(
      `${GEMINI_BASE_URL}/upload/v1beta/files?key=${this.apiKey}`,
      {
        method: "POST",
        headers: {
          "X-Goog-Upload-Protocol": "resumable",
          "X-Goog-Upload-Command": "start",
          "X-Goog-Upload-Header-Content-Length": fileSize.toString(),
          "X-Goog-Upload-Header-Content-Type": mimeType,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: {
            display_name: fileName,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Failed to initiate resumable upload: ${response.status} ${errorText}`,
      } as const;
    }

    const uploadUrl = response.headers.get("X-Goog-Upload-URL");
    if (!uploadUrl) {
      return {
        success: false,
        error: "No upload URL returned from Gemini",
      } as const;
    }

    return {
      success: true,
      uploadUrl,
    } as const;
  }

  async upload(
    uploadUrl: string,
    fileSize: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stream: ReadableStream<any>,
  ) {
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: new Headers({
        "Content-Length": fileSize.toString(),
        "X-Goog-Upload-Offset": "0",
        "X-Goog-Upload-Command": "upload, finalize",
      }),
      body: stream,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      return {
        success: false,
        error: `Failed to upload chunk: ${uploadResponse.status} ${errorText}`,
      } as const;
    }
    const json: { file?: { uri?: string } } = await uploadResponse.json();

    if (json.file?.uri === undefined) {
      return {
        success: false,
        error: "No file URI returned from Gemini upload",
      } as const;
    }

    return {
      success: true,
      fileUri: json.file.uri,
    } as const;
  }

  async getFileByUri(uri: string) {
    const response = await fetch(`${uri}?key=${this.apiKey}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Failed to get file: ${response.status} ${errorText}`,
      } as const;
    }

    const fileData: GeminiFileResponse = await response.json();
    return {
      success: true,
      data: fileData,
    } as const;
  }
}
