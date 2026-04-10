import { createClient } from "@arizeai/phoenix-client";
import { getTraces } from "@arizeai/phoenix-client/traces";

// 1. Initialize the client instance properly
const phoenixClient = createClient({
  options: {
    baseUrl: "http://127.0.0.1:6006",
  },
});

export const getRecentTraces = async (projectName: string) => {
  try {
    return await getTraces({
      project: { projectName: projectName },
      // 2. Pass the fully instantiated client here
      client: phoenixClient,
      limit: 10,
    });
  } catch (error) {
    console.error(`Failed to fetch traces for project: ${projectName}`, error);
    return [];
  }
};
