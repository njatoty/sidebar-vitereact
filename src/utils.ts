import { twMerge } from "tw-merge";
import { ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}