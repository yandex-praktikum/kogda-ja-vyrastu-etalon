import { FocusEventHandler, MouseEventHandler, useState } from 'react';
import { IUseMouseEvents } from './hooks.types';

const useMouseEvents : IUseMouseEvents = (handlers) => {
  const [isHovered, setHoverState] = useState(false);
  const [isFocused, setFocusState] = useState(false);
  const [isActive, setActiveState] = useState(false);
  const onMouseEnter : MouseEventHandler = (evt) => {
    setHoverState(true);
    if (handlers.mouseEnter) {
      handlers.mouseEnter(evt);
    }
  };
  const onMouseLeave : MouseEventHandler = (evt) => {
    setHoverState(false);
    if (handlers.mouseLeave) {
      handlers.mouseLeave(evt);
    }
  };
  const onFocus : FocusEventHandler = (evt) => {
    setFocusState(true);
    if (handlers.focus) {
      handlers.focus(evt);
    }
  };
  const onBlur : FocusEventHandler = (evt) => {
    setFocusState(false);
    if (handlers.blur) {
      handlers.blur(evt);
    }
  };
  const onMouseDown : MouseEventHandler = (evt) => {
    setActiveState(true);
    if (handlers.mouseDown) {
      handlers.mouseDown(evt);
    }
  };
  const onMouseUp : MouseEventHandler = (evt) => {
    setActiveState(false);
    if (handlers.mouseUp) {
      handlers.mouseUp(evt);
    }
  };

  return {
    status: {
      isHovered, isFocused, isActive,
    },
    handlers: {
      onMouseEnter,
      onMouseLeave,
      onBlur,
      onFocus,
      onMouseDown,
      onMouseUp,
    },
  };
};

export default useMouseEvents;
