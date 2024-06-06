import React, {
  useEffect, useMemo, FC, MouseEventHandler,
} from 'react';
import styled, { useTheme } from 'styled-components';

import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl';
import {
  ConfirmDeleteButton, CrossIcon, HeaderTwoText, RegularText,
} from '../ui-lib';

import { mobileBreakpoint, mobileViewModal } from '../constants';
import { TModalProps } from '../types/widgets.types';

const modalStepWidth = (600 - 280) / (mobileViewModal - mobileBreakpoint);
const modalStepHeight = (320 - 342) / (mobileViewModal - mobileBreakpoint);
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 95;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 24px;
  height: 24px;
  border: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 98;
  background-color: transparent;
`;

const ModalDialog = styled.div`
  position: relative;
  width: 600px;
  height: 320px;
  z-index: 97;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 0 30px;
  background-color: ${({ theme }) => theme.bgPrimary};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08), 0 0 4px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  @media screen and (max-width: ${mobileViewModal}px) {
    width: calc(600px - (${mobileViewModal}px - 100vw) * ${modalStepWidth});
    height: calc(320px - (${mobileViewModal}px - 100vw) * ${modalStepHeight});
  }
`;

const Modal : FC<TModalProps> = ({ onClose, onSubmit }) => {
  const theme = useTheme();
  const portalRoot = useMemo(() => document.getElementById('modal'), []) as Element;
  useEffect(() => {
    const handleEscClose = (evt: KeyboardEvent) : void => {
      if (evt.key && evt.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose, portalRoot]);
  const onCloseClick : MouseEventHandler = () => onClose();

  return ReactDOM.createPortal(
    (
      <ModalOverlay onClick={onCloseClick}>
        <ModalDialog>
          <CloseButton onClick={onCloseClick}><CrossIcon color={theme.primaryText} /></CloseButton>
          <HeaderTwoText color={theme.modalCaption} marginCSS='margin-top: 56px;'>
            <FormattedMessage id='deleteArticle' />
          </HeaderTwoText>
          <RegularText
            size='large'
            weight={400}
            sansSerif
            color={theme.modalText}
            marginCSS='margin: 36px 0;'
            paddingCSS='max-width: 400px;'>
            <FormattedMessage id='deletepopuptext' />
          </RegularText>
          <ConfirmDeleteButton onClick={onSubmit} />
        </ModalDialog>
      </ModalOverlay>
    ), portalRoot,
  );
};

export default Modal;
