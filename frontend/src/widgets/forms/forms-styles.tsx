import styled from 'styled-components';
import { Link } from 'react-router-dom';

type TInputFieldsetProps = {
  rowGap: number;
};

export const FormContainer = styled.div`
  padding: 16px 0 0 0;
  max-width: 540px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormTitle = styled.h2`
  margin: 0 0 40px 0;
  color: ${({ theme }) => theme.primaryText};
  font-size: ${({ theme }) => theme.secondLevelHeading.size}px;
  font-family: ${({ theme }) => theme.secondLevelHeading.family};
  font-weight: ${({ theme }) => theme.secondLevelHeading.weight};
  line-height: ${({ theme }) => theme.secondLevelHeading.height}px;

  @media(max-width: 768px) {
    font-size: ${({ theme }) => theme.secondLevelHeadingMobile.size}px;
    font-family: ${({ theme }) => theme.secondLevelHeadingMobile.family};
    font-weight: ${({ theme }) => theme.secondLevelHeadingMobile.weight};
    line-height: ${({ theme }) => theme.secondLevelHeadingMobile.height}px;
  }
`;

export const FormLoginLink = styled(Link)`
  margin: 0 0 24px 0;
  text-decoration: none;
  color: ${({ theme }) => theme.markedText};
  font-size: ${({ theme }) => theme.text18Sans.size}px;
  font-family: ${({ theme }) => theme.text18Sans.family};
  font-weight: ${({ theme }) => theme.text18Sans.weight};
  line-height: ${({ theme }) => theme.text18Sans.height}px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputFieldset = styled.fieldset<TInputFieldsetProps>`
  padding: 0;
  margin: 0 0 24px 0;
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.rowGap}px;
  box-sizing: border-box;
  border: none;
`;

export const ButtonContainer = styled.div`
  align-self: flex-end;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px
`;
