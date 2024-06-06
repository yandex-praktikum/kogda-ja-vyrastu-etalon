import { TColorSet } from '../../types/styles.types';

const setColor = (
  isHovered: boolean,
  isFocused: boolean,
  isActive: boolean,
  isDisabled: boolean,
) : keyof TColorSet => {
  let colorType : keyof TColorSet = 'default';
  if (isFocused) {
    colorType = 'active';
  }
  if (isHovered) {
    colorType = 'hover';
  }
  if (isActive) {
    colorType = 'active';
  }
  if (isDisabled) {
    colorType = 'disabled';
  }
  return colorType;
};

export default setColor;
