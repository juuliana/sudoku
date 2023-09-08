"use client";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: white;
  width: 30rem;
  height: 30rem;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 10rem;
  height: 10rem;
  border: 2px solid #000;
`;

export const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3.3rem;
  height: 3.3rem;
  border: 1px solid #000;

  span {
    color: #000;
    font-size: 1.3rem;
    font-weight: 500;
  }
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  width: 10rem;
  height: 3rem;
  background-color: #fff998;
  border: 1px solid #fff;
  border-radius: 10px;

  color: #000;
  font-size: 1.3rem;
  font-weight: 500;
`;
