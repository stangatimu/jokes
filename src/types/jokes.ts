export type NewJoke = {
  Body: string;
  Title: string;
  Views: number;
  Author: string;
};

export interface Joke extends NewJoke {
  id: number;
  CreatedAt: number;
}

export enum ViewsColors {
  Tomato = "tomato",
  Orange = "orange",
  Yellow = "yellow",
  Green = "green",
}
