/**
 * Classifies a raw auth error into a user-friendly message.
 *
 * @param error - The caught error object (from Supabase or a native fetch failure).
 * @returns A human-readable string suitable for display in a toast notification.
 */
export function classifyAuthError(error: {
  message?: string;
  status?: number;
}): string {
  let errorMessage = error.message || "An unexpected error occurred";
  const safeMessage = errorMessage.toLowerCase();

  if (
    error.status === 429 ||
    safeMessage.includes("rate limit") ||
    safeMessage.includes("too many requests")
  ) {
    errorMessage =
      "Slow down! You've made too many requests. Please wait a few minutes before trying again.";
  } else if (
    safeMessage.includes("failed to fetch") ||
    safeMessage.includes("networkerror") ||
    safeMessage.includes("network request failed")
  ) {
    errorMessage =
      "Unable to reach the authentication service. " +
      "Please check your internet connection. " +
      "If the problem persists, the service may be temporarily unavailable — try again in a few minutes.";
  }

  return errorMessage;
}
