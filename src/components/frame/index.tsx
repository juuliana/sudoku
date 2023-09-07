"use client";
import { useEffect, useState } from "react";

import { Frame, frames } from "./structure";
import { Container, Content, Item } from "./styles";

export function Frame() {
  const [data, setData] = useState([] as Frame[]);

  useEffect(() => {
    increment();
  }, []);

  function increment() {
    setData(frames);

    const parsedValues = frames.map(({ values }) => values);

    let currentValues = [
      ...parsedValues[0],
      ...parsedValues[1],
      ...parsedValues[2],
      ...parsedValues[3],
      ...parsedValues[4],
      ...parsedValues[5],
      ...parsedValues[6],
      ...parsedValues[7],
      ...parsedValues[8],
    ];

    let randomValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const newData = frames.map(({ frame, values }) => {
      const newValues = values.map(({ x, y }) => {
        const position = Math.floor(Math.random() * randomValues.length + 0);

        const newValue = randomValues[position];
        randomValues = randomValues.filter((_, index) => index !== position);

        const filteredValues = currentValues
          .map((current) => {
            if (current?.x === x && current?.y === y) return null;
            return current;
          })
          .filter((value) => value);

        currentValues = [...filteredValues, { x, y, value: newValue }] as any;

        return {
          x,
          y,
          value: newValue,
        };
      });

      randomValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      return {
        frame,
        values: newValues,
      };
    });

    setData(newData as any);
  }

  return (
    <Container>
      {data?.map(({ frame, values }) => (
        <Content key={frame}>
          {values?.map(({ value }) => (
            <Item key={value}>
              <span>{value}</span>
            </Item>
          ))}
        </Content>
      ))}
    </Container>
  );
}
