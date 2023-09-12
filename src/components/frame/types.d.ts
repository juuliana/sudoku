export namespace IFrame {
  export type Values = {
    x: number;
    y: number;
    value: number;
  };

  export interface Frame {
    frame: number;
    values: Values[];
  }
}
