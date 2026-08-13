import { describe, it, expect } from "vitest";
import { helloWorld } from "../src/helloworld.js";

describe("helloWorld", () => {
    it("creates a hello world message", () => {
        const result = helloWorld("Test");
        expect(result).toBe("Test hello world!");
    });
});