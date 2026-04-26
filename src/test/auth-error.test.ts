import { describe, it, expect } from "vitest";
import { classifyAuthError } from "@/lib/authErrors";

// ---------------------------------------------------------------------------
// Unit tests for the shared auth error-message classification utility
// ---------------------------------------------------------------------------

describe("classifyAuthError", () => {
  it("returns a rate-limit message when status is 429", () => {
    const msg = classifyAuthError({ status: 429, message: "too many requests" });
    expect(msg).toMatch(/slow down/i);
  });

  it("returns a rate-limit message when message includes 'rate limit'", () => {
    const msg = classifyAuthError({ message: "Rate limit exceeded" });
    expect(msg).toMatch(/slow down/i);
  });

  it("returns a network-unreachable message for 'Failed to fetch'", () => {
    const msg = classifyAuthError({ message: "Failed to fetch" });
    expect(msg).toMatch(/unable to reach/i);
  });

  it("returns a network-unreachable message for 'NetworkError'", () => {
    const msg = classifyAuthError({ message: "NetworkError when attempting to fetch resource" });
    expect(msg).toMatch(/unable to reach/i);
  });

  it("returns a network-unreachable message for 'network request failed'", () => {
    const msg = classifyAuthError({ message: "Network request failed" });
    expect(msg).toMatch(/unable to reach/i);
  });

  it("passes through unrecognized error messages unchanged", () => {
    const msg = classifyAuthError({ message: "Invalid email or password" });
    expect(msg).toBe("Invalid email or password");
  });

  it("falls back to a default message when error has no message", () => {
    const msg = classifyAuthError({});
    expect(msg).toBe("An unexpected error occurred");
  });
});
