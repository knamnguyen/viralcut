"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "~/trpc/react";

export default function RemotionPage() {
  const [text, setText] = useState("Hello World!");
  const [currentRender, setCurrentRender] = useState<{
    renderId: string;
    bucketName: string;
  } | null>(null);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Get Remotion status
  const { data: status, refetch: refetchStatus } = useQuery(
    trpc.remotionHello.getStatus.queryOptions(),
  );


  // Render video mutation
  const renderVideoHello = useMutation(
    trpc.remotionHello.renderVideoHello.mutationOptions({
      onSuccess: (data) => {
        setCurrentRender({
          renderId: data.renderId,
          bucketName: data.bucketName,
        });
      },
    }),
  );

  // Get render progress - only when currentRender exists
  const progressQueryEnabled = Boolean(
    currentRender?.renderId && currentRender?.bucketName,
  );
  const { data: progress, isLoading: progressLoading } = useQuery({
    ...trpc.remotionHello.getRenderProgress.queryOptions({
      renderId: currentRender?.renderId || "",
      bucketName: currentRender?.bucketName || "",
    }),
    enabled: progressQueryEnabled,
    refetchInterval: (data: any) => {
      // Only refetch if we have a current render and it's not done
      return progressQueryEnabled && !data?.done ? 2000 : false;
    },
  });

  const handleRender = () => {
    renderVideoHello.mutate({ text: text.trim() || undefined });
  };

  const resetRender = () => {
    setCurrentRender(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">
            Remotion Lambda Demo
          </h1>
          <p className="text-lg text-slate-300">
            Generate animated videos using Remotion and AWS Lambda
          </p>
        </div>

        {/* Status Section */}
        <div className="mb-8 rounded-lg bg-slate-800 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Setup Status
          </h2>
          {status ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${status.functionsDeployed ? "bg-green-500" : "bg-red-500"}`}
                />
                <span className="text-slate-300">
                  Lambda Functions:{" "}
                  {status.functionsDeployed ? "Deployed" : "Not Deployed"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${status.siteDeployed ? "bg-green-500" : "bg-red-500"}`}
                />
                <span className="text-slate-300">
                  Remotion Site:{" "}
                  {status.siteDeployed ? "Deployed" : "Not Deployed"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${status.ready ? "bg-green-500" : "bg-yellow-500"}`}
                />
                <span className="text-slate-300">
                  Status: {status.ready ? "Ready" : "Setup Required"}
                </span>
              </div>
              {status.error && (
                <div className="mt-2 rounded border border-red-500 bg-red-900/50 p-3">
                  <span className="text-red-300">Error: {status.error}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-slate-400">Loading status...</div>
          )}
          <button
            onClick={() => refetchStatus()}
            className="mt-4 rounded bg-slate-700 px-4 py-2 text-white transition-colors hover:bg-slate-600"
          >
            Refresh Status
          </button>
        </div>

        {/* Video Generation Section */}
        {status?.ready ? (
          <div className="mb-8 rounded-lg bg-slate-800 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Generate Video
            </h2>

            {!currentRender ? (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="text-input"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Text to Display
                  </label>
                  <input
                    id="text-input"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your text here..."
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    maxLength={200}
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    {text.length}/200 characters
                  </p>
                </div>

                <button
                  onClick={handleRender}
                  disabled={renderVideoHello.isPending || !text.trim()}
                  className="w-full rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-slate-600"
                >
                  {renderVideoHello.isPending
                    ? "Starting Render..."
                    : "Generate Video"}
                </button>

                {renderVideoHello.error && (
                  <div className="rounded border border-red-500 bg-red-900/50 p-3">
                    <span className="text-red-300">
                      Error: {renderVideoHello.error.message}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">
                    Rendering Progress
                  </h3>
                  <button
                    onClick={resetRender}
                    className="rounded bg-slate-700 px-4 py-2 text-white transition-colors hover:bg-slate-600"
                  >
                    New Render
                  </button>
                </div>

                {progressLoading ? (
                  <div className="text-slate-400">Loading progress...</div>
                ) : progress ? (
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex justify-between text-sm text-slate-300">
                        <span>Progress</span>
                        <span>
                          {Math.round((progress.progress || 0) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-700">
                        <div
                          className="h-2 rounded-full bg-purple-500 transition-all duration-300"
                          style={{
                            width: `${(progress.progress || 0) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {progress.done && progress.outputFile && (
                      <div className="rounded border border-green-500 bg-green-900/50 p-4">
                        <h4 className="mb-2 font-medium text-green-300">
                          Video Ready!
                        </h4>
                        <p className="mb-3 text-sm text-green-200">
                          File: {progress.outputFile}
                        </p>
                        <a
                          href={`https://${progress.outputBucket}.s3.${status.region}.amazonaws.com/${progress.outputFile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block rounded bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                        >
                          Download Video
                        </a>
                      </div>
                    )}

                    {progress.fatalErrorEncountered && (
                      <div className="rounded border border-red-500 bg-red-900/50 p-4">
                        <h4 className="mb-2 font-medium text-red-300">
                          Render Failed
                        </h4>
                        <p className="text-sm text-red-200">
                          {progress.errors?.[0]?.message ||
                            "Unknown error occurred"}
                        </p>
                      </div>
                    )}

                    {progress.costs && (
                      <div className="text-sm text-slate-400">
                        Estimated cost: $0.0000
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        ) : (
          <div className="mb-8 rounded-lg bg-slate-800 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Setup Required
            </h2>
            <div className="space-y-3 text-slate-300">
              <p>
                Before you can generate videos, you need to deploy the Remotion
                Lambda infrastructure:
              </p>
              <ol className="list-inside list-decimal space-y-2 text-sm">
                <li>
                  Deploy Lambda function:{" "}
                  <code className="rounded bg-slate-700 px-2 py-1">
                    cd packages/remotion && pnpm remotion:functions:deploy
                  </code>
                </li>
                <li>
                  Deploy Remotion site:{" "}
                  <code className="rounded bg-slate-700 px-2 py-1">
                    cd packages/remotion && pnpm remotion:sites:create
                  </code>
                </li>
                <li>Refresh this page to check status</li>
              </ol>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="rounded-lg bg-slate-800 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            How it Works
          </h2>
          <div className="space-y-2 text-sm text-slate-300">
            <p>1. Enter custom text or use the default "Hello World!"</p>
            <p>2. Click "Generate Video" to start rendering on AWS Lambda</p>
            <p>3. Watch the progress bar as your video is generated</p>
            <p>4. Download your finished video when complete</p>
          </div>
        </div>
      </div>
    </div>
  );
}
