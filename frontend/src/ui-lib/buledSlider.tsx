import React from 'react';
import styled from 'styled-components';
import { blue, dividerGray } from '../constants/colors';

type Tbullet = {
  isActive:boolean;
  onClick:(e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Bulet = styled.button<{ isActive: boolean }>`
    border-radius: 50%;
    cursor: pointer;
    width: 12px;
    height: 12px;
    background-color: ${({ isActive }) => (isActive ? blue : dividerGray)};
    border: none;
    :hover {
        opacity:0.9
    }
`;

const BuletSlider = ({ isActive = false, onClick }:Tbullet) => (
  <Bulet isActive={isActive} onClick={onClick} />
);
export default BuletSlider;
