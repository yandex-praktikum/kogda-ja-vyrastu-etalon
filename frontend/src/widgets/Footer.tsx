import React, { FC } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Divider } from '../ui-lib';

const FooterStyled = styled.footer`

  width: 100%;
  padding: 0;
  margin: 130px 0 0 0;
  background-color: ${({ theme }) => theme.bgPrimary};
  @media screen and (max-width: 768px) {
    margin: 100px 0 0 0;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1140px;
  height: 120px;
  box-sizing: border-box;
  padding: 0 20px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width:1200px) {
    max-width: 940px;
  }
  @media screen and (max-width:992px) {
    max-width: 720px;
    height: 87px;
  }
  @media screen and (max-width:768px) {
    max-width: 576px;

  }
  @media screen and (max-width:544px) {
    height: 79px;
  }
`;

const Text = styled.p`
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.secondaryText};
  white-space: nowrap;
  font: ${({ theme }) => theme.footerText.weight} ${({ theme }) => theme.footerText.size}px/${({ theme }) => theme.footerText.height}px ${({ theme }) => theme.footerText.family};
`;

const TextCreatedBy = styled(Text)`
  white-space: normal;
  @media screen and (max-width:770px) {
    line-height: 20px;
    max-width: 143px;
  }
`;

const Footer: FC = () => (
  <FooterStyled>
    <Divider distance={0} />
    <Container>
      <Text>
        &copy;&nbsp;
        <FormattedMessage
          id='mainTitle'
          defaultMessage='Когда вырасту' />
      </Text>
      <TextCreatedBy>
        <FormattedMessage
          id='footerMessage'
          defaultMessage='Сделано студентами Яндекс Практикума' />
      </TextCreatedBy>
    </Container>
  </FooterStyled>
);

export default Footer;
