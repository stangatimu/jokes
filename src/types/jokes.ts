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

export enum SortFields {
  View = "Views",
  CreatedAt = "CreatedAt",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export interface IQuery {
  page?: string;
  perPage?: string;
  sort?: SortFields;
  order?: SortOrder;
}
