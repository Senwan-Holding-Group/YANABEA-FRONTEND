import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatTimeTo12Hour = (time: string | number): string => {
  const timeStr = time?.toString().padStart(4, '0');
  const hours = timeStr?.slice(0, 2);
  const minutes = timeStr?.slice(2, 4);
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};
