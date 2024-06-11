import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts the repository owner and name from a GitHub URL.
 *
 * @param url The GitHub URL from which to extract the owner and name.
 * @returns An object containing the repository owner and name, or null if the URL is invalid.
 */
export const getRepoOwnerAndName = (url: string | null) => {
  const regex = /github\.com\/(?<owner>[^/]+)\/(?<name>[^/]+)(\/|$)/;
  const match = url?.match(regex);

  if (match?.groups) {
    const { owner, name } = match.groups;
    return { owner, name };
  }

  return null;
};

export const getCurrentPage = (page?: string | null) => {
  return Math.max(
    page && !Number.isNaN(Number(page)) ? parseInt(page || "1", 10) : 1,
    1,
  );
};

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// Courtesy: dub.co
export const setImagePath = (url: string, imageUrl: string) => {
  if (!imageUrl) {
    return null;
  }
  if (isValidUrl(imageUrl)) {
    return imageUrl;
  }
  const { protocol, host } = new URL(url);
  const baseURL = `${protocol}//${host}`;
  return new URL(imageUrl, baseURL).toString();
};
