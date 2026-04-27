export function getErrorMessage(error: unknown, fallback = "Error inesperado") {
  if (typeof error === "object" && error && "response" in error) {
    const err = error as { response?: { data?: { error?: string } } };
    return err.response?.data?.error || fallback;
  }
  return fallback;
}
