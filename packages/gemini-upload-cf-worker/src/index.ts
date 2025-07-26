import { GeminiUploadClient } from "./gemini-client";

const geminiUploadClient = new GeminiUploadClient();

export default {
  async fetch(request, env): Promise<Response> {
    geminiUploadClient.setApiKey(env.GEMINI_API_KEY);
    if (request.method === "OPTIONS") {
      return new Response(null);
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "POST, OPTIONS" },
      });
    }

    const url = new URL(request.url);

    if (url.pathname === "/initiate") {
      const {
        fileName,
        mimeType,
        fileSize,
      }: { fileName?: string; mimeType?: string; fileSize?: number } =
        await request.json();

      if (
        fileName === undefined ||
        mimeType === undefined ||
        fileSize === undefined
      ) {
        return new Response("Bad Request", {
          status: 400,
        });
      }

      const initiate = await geminiUploadClient.initiate(
        fileName,
        mimeType,
        fileSize,
      );

      if (!initiate.success) {
        return new Response(null, {
          status: 500,
        });
      }

      return new Response(JSON.stringify({ uploadUrl: initiate.uploadUrl }));
    }

    return new Response(null, {
      status: 404,
    });
  },
} satisfies ExportedHandler<Env>;
