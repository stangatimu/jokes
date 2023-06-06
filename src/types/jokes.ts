export type Joke = {
  id: number;
  Body: string;
  Title: string;
  Views: number;
  Author: string;
  CreatedAt: number;
};

export enum ViewsColors {
  Tomato = "tomato",
  Orange = "orange",
  Yellow = "yellow",
  Green = "green",
}
