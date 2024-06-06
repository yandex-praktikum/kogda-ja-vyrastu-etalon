import React, { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { OpenMenuButton } from '../ui-lib';
import { useDispatch, useSelector } from '../services/hooks';
import { openMenu, closeMenu } from '../store';
import HeaderMenuWidget from './header-menu-widget';
import { HomeButton, HeaderLoginButton } from '../ui-lib/buttons';
import FigureLeft from '../assets/images/header/header-left-figure.svg';
import FigureCenter from '../assets/images/header/header-center-figure.svg';
import FigureRight from '../assets/images/header/header-right-figure.svg';
import FigureEllipse from '../assets/images/header/header-left-right-figure-ellipse.svg';

const HeaderStyled = styled.header`
  width: 100%;
  padding: 0;
`;

const BackgroundOuterContainer = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  z-index: -1;
`;

const BackgroundContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 19% 50% 31%;
  top: 0;
  width: 1920px;
  height: 100vh;
  max-height: 640px;
  left: 50%;
  transform: translate(-50%);
  z-index: -1;
  @media screen and (max-width:1700px) {
    width: 1920px;
  }
  @media screen and (max-width:1300px) {
    width: 100%;
  }
`;

type TFigureContainerProps = {
  bgImg?: string;
  bgWidth?: number;
  bgHeight?: number;
  bgX?: number;
  bgY?: number;
};

const FigureContainerLeft = styled.div<TFigureContainerProps>`
  background-image: url(${FigureLeft});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right top;
  transition: .3s;
  @media screen and (max-width:1700px) {
    background-position: right -25px top -100px;
    transform: rotate(-19deg);
  }
  @media screen and (max-width:1300px) {
    background: none;
  }
`;

const FigureContainerCenter = styled.div<TFigureContainerProps>`
  background-image: url(${FigureCenter});
  background-repeat: no-repeat;
  background-size: 39%;
  background-position-x: 89%;
  transition: .3s;
  position: relative;
  @media screen and (max-width:1700px) {
    background-size: 30%;
    background-position-x: 58%;
  }
  @media screen and (max-width:1400px) {
    background-position-x: 52%;
  }
  @media screen and (max-width:1300px) {
    background-size: 39%;
  }
`;

const FigureLeftEllipse = styled.div<TFigureContainerProps>`
  background-image: url(${FigureEllipse});
  background-repeat: no-repeat;
  background-size: contain;
  transition: .3s;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 31%;
  left: -1%;
  @media screen and (max-width:1700px) {
    left: 0;
  }
  @media screen and (max-width:1400px) {
    top: 33%;
  }
  @media screen and (max-width:1300px) {
    background: none;
  }
`;

const FigureContainerRight = styled.div<TFigureContainerProps>`
  background-image: url(${FigureRight});
  background-repeat: no-repeat;
  background-position: left center;
  margin-bottom: 43px;
  transition: .3s;
  @media screen and (max-width:1700px) {
    background-size: 85%;
    background-position: left 50px center;
  }
  @media screen and (max-width:1400px) {
    background-size: 75%;
  }
  @media screen and (max-width:1300px) {
    background: none;
  }
`;

const FigureRightEllipse = styled.div<TFigureContainerProps>`
  background-image: url(${FigureEllipse});
  background-repeat: no-repeat;
  background-size: contain;
  transition: .3s;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 18%;
  right: -8%;
  @media screen and (max-width:1700px) {
    right: -31%;
    top: 20%;
  }
  @media screen and (max-width:1400px) {
    background: none;
  }
`;

const Navigation = styled.nav`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 24px;
  .navlink {
    text-decoration: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0;
  z-index: 99999;

  @media screen and (max-width:1300px) {
    max-width: 955px;
  }
  @media screen and (max-width:1023px) {
    max-width: 720px;
  }
  @media screen and (max-width:720px) {
    max-width: 280px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;
  margin: 0;
  padding: 54px 0 56px 0;
  border-bottom: 1px solid ${({ theme }) => theme.primaryText};
  @media screen and (max-width:1300px) {
    padding: 22px 0 40px 0;
  }
  @media screen and (max-width:1023px) {
    gap: 15px;
    padding: 14px 0 24px 0;
  }
  @media screen and (max-width:720px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 13px;
    padding: 14px 0 17px 0;
  }
`;

const MainText = styled.h1`
  font: ${({ theme }) => theme.text118Sans.weight} ${({ theme }) => theme.text118Sans.size}px/${({ theme }) => theme.text118Sans.height}% ${({ theme }) => theme.text118Sans.family};
  margin: 0;
  padding: 0;
  @media screen and (max-width:1300px) {
    font-size: ${({ theme }) => theme.text102Sans.size}px;
  }
  @media screen and (max-width:1023px) {
    font-size: ${({ theme }) => theme.text86Sans.size}px;
  }
  @media screen and (max-width:720px) {
    font-size: ${({ theme }) => theme.text40Sans.size}px;
  }
`;

const TagLine = styled.p`
  font: ${({ theme }) => theme.text26SubSans.weight} ${({ theme }) => theme.text26SubSans.size}px/${({ theme }) => theme.text26SubSans.height}% ${({ theme }) => theme.text26SubSans.family};
  max-width: 225px;
  margin: 0;
  padding: 22px 0 0 0;
  @media screen and (max-width:1300px) {
    font-size: ${({ theme }) => theme.text18SubSans.size}px;
    max-width: 156px;
  }
  @media screen and (max-width:1023px) {
    padding: 18px 0 0 0;
  }
  @media screen and (max-width:720px) {
    font-size: ${({ theme }) => theme.text16SubSans.size}px;
    max-width: 139px;
    padding: 0;
  }
`;

const Header: FC = () => {
  const dispatch = useDispatch();
  const { isMenuOpen, isLoggedIn } = useSelector((state) => state.system);
  const { nickname, username, image } = useSelector((store) => store.profile);

  const onOpenMenuClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation(); dispatch(openMenu());
  };
  const closeMenuClick: MouseEventHandler<HTMLElement> = () => dispatch(closeMenu());

  return (
    <HeaderStyled onClick={closeMenuClick}>
      <BackgroundOuterContainer>
        <BackgroundContainer>
          <FigureContainerLeft />
          <FigureContainerCenter>
            <FigureLeftEllipse />
            <FigureRightEllipse />
          </FigureContainerCenter>
          <FigureContainerRight />
        </BackgroundContainer>
      </BackgroundOuterContainer>
      <Container>
        <Navigation>
          <Link className='navlink' to='/'><HomeButton onClick={() => { }} /></Link>
          {isLoggedIn && isMenuOpen && <HeaderMenuWidget />}
          {isLoggedIn && !isMenuOpen && (
            <OpenMenuButton
              onClick={(e) => onOpenMenuClick(e)}
              name={(nickname ?? username) || ''}
              image={image || ''} />
          )}
          {!isLoggedIn && <Link className='navlink' to='/login'><HeaderLoginButton onClick={() => { }} /></Link>}
        </Navigation>
        <TextContainer>
          <MainText>
            <FormattedMessage
              id='mainTitle'
              defaultMessage='Когда вырасту' />
          </MainText>
          <TagLine>
            <FormattedMessage
              id='mainSubtitle'
              defaultMessage='Каково быть джуном
              в турбулентном мире' />
          </TagLine>
        </TextContainer>
      </Container>
    </HeaderStyled>
  );
};

export default Header;
