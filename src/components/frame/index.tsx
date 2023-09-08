/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

import { Frame, frames } from "./structure";
import { Button, Container, Content, Item, Main } from "./styles";

export function Frame() {
  const [data, setData] = useState([] as Frame[]);
  const [emptyFrames, setEmptyFrame] = useState<number[]>([]);

  useEffect(() => {
    if (emptyFrames.length > 0) increment();
  }, [emptyFrames]);

  function increment() {
    setData(frames);

    const parsedValues = frames.map(({ values, frame }) =>
      values.map((array) => {
        return { ...array, frame: 1 };
      })
    );

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

    const randomValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const newData = frames.map(({ frame, values }) => {
      const newValues = values.map(({ x, y }) => {
        const lineValues = currentValues
          .filter((current) => current?.x === x)
          .map(({ value }) => value)
          .filter((value) => value);

        const columnValues = currentValues
          .filter((current) => current?.y === y)
          .map(({ value }) => value)
          .filter((value) => value);

        const frameValues = currentValues
          .filter((current) => current?.frame === frame)
          .map(({ value }) => value)
          .filter((value) => value);

        const filteredRandomValues = randomValues.filter(
          (number: any) =>
            !lineValues.includes(number) &&
            !columnValues.includes(number) &&
            !frameValues.includes(number)
        );

        const position = Math.floor(
          Math.random() * filteredRandomValues.length + 0
        );

        const newValue = filteredRandomValues[position];

        const filteredValues = currentValues
          .map((current) => {
            if (current?.x === x && current?.y === y) return null;
            return current;
          })
          .filter((value) => value);

        currentValues = [
          ...filteredValues,
          { x, y, value: newValue, frame },
        ] as any;

        return {
          x,
          y,
          value: newValue,
        };
      });

      return {
        frame,
        values: newValues,
      };
    });

    setData(newData as any);

    const frameWithoutValues = currentValues
      .filter((current) => !current?.value)
      .map(({ frame }) => frame);

    var filtered = frameWithoutValues.filter(
      (value, i) => frameWithoutValues.indexOf(value) === i
    );

    setEmptyFrame(filtered);
  }

  return (
    <Container>
      <Main>
        {data?.map(({ frame, values }) => (
          <Content key={frame}>
            {values?.map(({ value }) => (
              <Item key={value}>
                <span>{value}</span>
              </Item>
            ))}
          </Content>
        ))}
      </Main>

      <Button onClick={increment}>Gerar sudoku</Button>
    </Container>
  );
}
