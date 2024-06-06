import { FocusEventHandler, MouseEventHandler } from 'react';

export type THookEventsHandlers = {
  mouseEnter?: MouseEventHandler,
  mouseLeave?: MouseEventHandler,
  focus?: FocusEventHandler,
  blur?: FocusEventHandler,
  mouseDown?: MouseEventHandler,
  mouseUp?: MouseEventHandler,
};
export interface IUseMouseEvents {
  (handlers: THookEventsHandlers) : {
    status: {
      isHovered: boolean,
      isFocused: boolean,
      isActive: boolean,
    },
    handlers: {
      onMouseEnter: MouseEventHandler,
      onMouseLeave: MouseEventHandler,
      onFocus: FocusEventHandler,
      onBlur: FocusEventHandler,
      onMouseDown: MouseEventHandler,
      onMouseUp: MouseEventHandler,
    }
  }
}
