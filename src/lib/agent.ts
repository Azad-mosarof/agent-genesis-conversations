
import { nanoid } from "nanoid";

export type AgentStatus = "draft" | "configuring" | "deployed" | "archived";

export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  toolIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Function to create a new agent
export function createAgent(name: string, description: string): AgentConfig {
  return {
    id: nanoid(),
    name,
    description,
    status: "draft",
    toolIds: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

// Function to update an agent's config
export function updateAgentConfig(agent: AgentConfig, updates: Partial<AgentConfig>): AgentConfig {
  return {
    ...agent,
    ...updates,
    updatedAt: new Date(),
  };
}

// Function to deploy an agent
export function deployAgent(agent: AgentConfig): AgentConfig {
  return {
    ...agent,
    status: "deployed",
    updatedAt: new Date(),
  };
}
