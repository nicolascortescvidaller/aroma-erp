import { useForm as useReactHookForm } from "react-hook-form";

export function useForm<T extends Record<string, unknown>>(defaultValues: T) {
  return useReactHookForm<T>({ defaultValues, mode: "onBlur" });
}
