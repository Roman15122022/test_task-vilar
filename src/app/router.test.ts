import { getRouterBasename } from "@/app/router";

describe("router config", () => {
  it("uses no basename for a root deployment", () => {
    expect(getRouterBasename("/")).toBeUndefined();
  });

  it("uses the Vite base path as basename for GitHub Pages project deployment", () => {
    expect(getRouterBasename("/test_task-vilar/")).toBe("/test_task-vilar");
  });
});
