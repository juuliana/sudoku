/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

import { IFrame } from "./types";
import { frames } from "./structure";
import { Button, Container, Content, Item, Main } from "./styles";

const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function Frame() {
  const [data, setData] = useState<IFrame.Frame[]>([]);
  const [emptyFrames, setEmptyFrame] = useState<number[]>([]);

  useEffect(() => {
    if (emptyFrames.length > 0) generate();
  }, [emptyFrames]);

  function generate() {
    setData(frames);

    const values = frames.map(({ values, frame }) =>
      values.map((array) => ({ ...array, frame }))
    );

    let currentValues = [
      ...values[0],
      ...values[1],
      ...values[2],
      ...values[3],
      ...values[4],
      ...values[5],
      ...values[6],
      ...values[7],
      ...values[8],
    ];

    const newData = frames.map(({ frame, values }) => {
      const newValues = values.map(({ x, y }) => {
        const lineValues = currentValues
          .filter((current) => current?.x === x && current?.value)
          .map(({ value }) => value);

        const columnValues = currentValues
          .filter((current) => current?.y === y && current?.value)
          .map(({ value }) => value);

        const frameValues = currentValues
          .filter((current) => current?.frame === frame && current?.value)
          .map(({ value }) => value);

        const filteredValues = VALUES.filter(
          (number) =>
            !lineValues.includes(number) &&
            !columnValues.includes(number) &&
            !frameValues.includes(number)
        );

        const position = Math.floor(Math.random() * filteredValues.length + 0);
        const newValue = filteredValues[position];

        const filteredCurrentValues = currentValues
          .map((current) => {
            if (current?.x === x && current?.y === y) return null;
            return current;
          })
          .filter((value) => value);

        currentValues = [
          ...filteredCurrentValues,
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

      <Button onClick={generate}>Gerar sudoku</Button>
    </Container>
  );
}
