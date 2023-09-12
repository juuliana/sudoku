import { IFrame } from "./types";

export const values = [
  { x: 0, y: 0, value: 0 },
  { x: 0, y: 0, value: 0 },
  { x: 0, y: 0, value: 0 },
  { x: 0, y: 0, value: 0 },
  { x: 0, y: 0, value: 0 },
  { x: 0, y: 0, value: 0 },
  { x: 0, y: 0, value: 0 },
  { x: 0, y: 0, value: 0 },
  { x: 0, y: 0, value: 0 },
];

function getStructureByFrame(frame: number) {
  let startX = 0;
  let startY = 0;

  if ([1, 2, 3].includes(frame)) startX = 1;
  if ([4, 5, 6].includes(frame)) startX = 4;
  if ([7, 8, 9].includes(frame)) startX = 7;

  if ([1, 4, 7].includes(frame)) startY = 1;
  if ([2, 5, 8].includes(frame)) startY = 4;
  if ([3, 6, 9].includes(frame)) startY = 7;

  return { startX, startY };
}

export function getValues(frame: number) {
  const { startX, startY } = getStructureByFrame(frame);

  let parsedX = startX;
  let parsedY = startY;

  const parsedValues = values.map(({ value }, index) => {
    if (index > 0) {
      if ([3, 6].includes(index)) {
        parsedY = startY;
      } else {
        parsedY = parsedY + 1;
      }

      if (index >= 3) parsedX = startX + 1;
      if (index >= 6) parsedX = startX + 2;
    }

    return { x: parsedX, y: parsedY, value: value };
  });

  return parsedValues;
}

export const frames: IFrame.Frame[] = [
  //first line
  { frame: 1, values: getValues(1) },
  { frame: 2, values: getValues(2) },
  { frame: 3, values: getValues(3) },

  //second line
  { frame: 4, values: getValues(4) },
  { frame: 5, values: getValues(5) },
  { frame: 6, values: getValues(6) },

  //third line
  { frame: 7, values: getValues(7) },
  { frame: 8, values: getValues(8) },
  { frame: 9, values: getValues(9) },
];
