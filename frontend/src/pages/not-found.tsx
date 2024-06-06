import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { red } from '../constants/colors';

const Heading = styled.h2`
color: ${red};
font-size: 118px;
font-family: ${({ theme: { secondLevelHeading: { family } } }) => family};
line-height: 118px;
font-weight: ${({ theme: { secondLevelHeading: { weight } } }) => weight};
text-align: center;
margin-bottom: 24px;
@media screen and (max-width:320px) {
    font-size: 86px;
    line-height: 86px;
}
`;
const NotFoundStyle = styled.section`
    box-sizing: border-box;
    padding-top:80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height:747px;
    @media screen and (max-width:320px) {
        padding-top:40px;
        min-height:307px;
}
`;
const LinkStyle = styled(Link)`
    color: ${((props) => props.theme.markedText)};
`;
const Text = styled.p`
max-width: 297px;
text-align: center;
margin: 0;
font-family: ${({ theme: { text18Sans: { family } } }) => family};
  font-size: ${({ theme: { text18Sans: { size } } }) => size}px;
  font-weight: ${({ theme: { text18Sans: { weight } } }) => weight};
  line-height: ${({ theme: { text18Sans: { height } } }) => height}px;
  @media screen and (max-width:320px) {
    max-width: 213px;
    font-family: ${({ theme: { text16Sans: { family } } }) => family};
  font-size: ${({ theme: { text16Sans: { size } } }) => size}px;
  font-weight: ${({ theme: { text16Sans: { weight } } }) => weight};
  line-height: ${({ theme: { text16Sans: { height } } }) => height}px;

  }
`;

const NotFound = () => (
  <NotFoundStyle>
    <Heading>
      404
    </Heading>
    <div>
      <Text>
        <FormattedMessage
          id='noPageText'
          defaultMessage='Страница не найдена.' />
      </Text>
      <Text>
        <FormattedMessage
          id='goPageOnPage'
          defaultMessage='Чтобы читать блог, перейдите на ' />
        <LinkStyle to='/'>
          <FormattedMessage
            id='npPageLink'
            defaultMessage='Главную' />
        </LinkStyle>
      </Text>
    </div>
  </NotFoundStyle>
);
export default NotFound;
