import { ViewsColors } from "@/types/jokes";

export function maskEmail(email: string): string {
  return email.replace(/(@)([^\.\s]*)(\.[^\.\s]+)+/, function (_, a, b, c) {
    return a + "*".repeat(b.length) + c;
  });
}

export const parseParam = (value: string | string[] | undefined) => {
  if (value && typeof value === "string") {
    return parseInt(value);
  }
  return;
};

export const getColorByViews = (views: number): ViewsColors | undefined => {
  if (views >= 0 && views <= 25) {
    return ViewsColors.Tomato;
  } else if (views >= 26 && views <= 50) {
    return ViewsColors.Orange;
  } else if (views >= 51 && views <= 75) {
    return ViewsColors.Yellow;
  } else if (views >= 76 && views <= 100) {
    return ViewsColors.Green;
  } else {
    return;
  }
};
