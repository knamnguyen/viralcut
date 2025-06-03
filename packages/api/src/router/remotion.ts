import type { AwsRegion } from "@remotion/lambda/client";
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import {
  getFunctions,
  getRenderProgress,
  getSites,
  renderMediaOnLambda,
} from "@remotion/lambda/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

// Type-safe AWS region with fallback
const REGION = (process.env.REMOTION_AWS_REGION || "us-west-2") as AwsRegion;

// Initialize Lambda client with credentials from environment
const lambdaClient = new LambdaClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.REMOTION_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.REMOTION_AWS_SECRET_ACCESS_KEY!,
  },
});

export const remotionRouter = createTRPCRouter({
  renderVideo: publicProcedure
    .input(
      z.object({
        text: z.string().min(1).max(200).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Get deployed functions
        const functions = await getFunctions({
          region: REGION,
          compatibleOnly: true,
        });

        if (functions.length === 0) {
          throw new Error(
            "No Remotion Lambda functions found. Please deploy a function first.",
          );
        }

        const functionName = functions[0]?.functionName;
        if (!functionName) {
          throw new Error("Function name is undefined");
        }

        // Get deployed sites
        const sites = await getSites({
          region: REGION,
        });

        const demoSite = sites.sites.find(
          (site) => site.id === "hello-world-demo",
        );
        if (!demoSite) {
          throw new Error("Demo site not found. Please deploy the site first.");
        }

        // Render video on Lambda
        const { renderId, bucketName } = await renderMediaOnLambda({
          region: REGION,
          functionName,
          serveUrl: demoSite.serveUrl,
          composition: "HelloWorld",
          inputProps: {
            text: input.text || "Hello World!",
          },
          codec: "h264",
          imageFormat: "jpeg",
          maxRetries: 1,
          framesPerLambda: 20,
          privacy: "public",
        });

        return {
          success: true,
          renderId,
          bucketName,
          message: "Video rendering started successfully",
        };
      } catch (error) {
        console.error("Error rendering video:", error);
        throw new Error(
          `Failed to render video: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    }),

  getRenderProgress: publicProcedure
    .input(
      z.object({
        renderId: z.string(),
        bucketName: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        // Get deployed functions
        const functions = await getFunctions({
          region: REGION,
          compatibleOnly: true,
        });

        if (functions.length === 0) {
          throw new Error("No Remotion Lambda functions found.");
        }

        const functionName = functions[0]?.functionName;
        if (!functionName) {
          throw new Error("Function name is undefined");
        }

        const progress = await getRenderProgress({
          renderId: input.renderId,
          bucketName: input.bucketName,
          functionName,
          region: REGION,
        });

        return {
          done: progress.done,
          progress: progress.overallProgress,
          outputFile: progress.outputFile,
          outputBucket: progress.outBucket,
          costs: progress.costs,
          errors: progress.errors,
          fatalErrorEncountered: progress.fatalErrorEncountered,
        };
      } catch (error) {
        console.error("Error getting render progress:", error);
        throw new Error(
          `Failed to get render progress: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    }),

  getStatus: publicProcedure.query(async () => {
    try {
      // Check if functions are deployed
      const functions = await getFunctions({
        region: REGION,
        compatibleOnly: true,
      });

      // Check if sites are deployed
      const sites = await getSites({
        region: REGION,
      });

      const demoSite = sites.sites.find(
        (site) => site.id === "hello-world-demo",
      );

      return {
        functionsDeployed: functions.length > 0,
        functionNames: functions.map((f) => f.functionName),
        siteDeployed: !!demoSite,
        siteUrl: demoSite?.serveUrl,
        region: REGION,
        ready: functions.length > 0 && !!demoSite,
      };
    } catch (error) {
      console.error("Error getting status:", error);
      return {
        functionsDeployed: false,
        functionNames: [],
        siteDeployed: false,
        siteUrl: null,
        region: REGION,
        ready: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),
});
