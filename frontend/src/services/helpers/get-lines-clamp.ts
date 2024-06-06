const getLinesClamp = (height: number, lineHeight: number) : string => {
  if (lineHeight > 0) {
    return `display: -webkit-box;
  -webkit-line-clamp: ${Math.floor(height / lineHeight)};
  -webkit-box-orient: vertical;
  overflow: hidden;`;
  }
  return '';
};

export default getLinesClamp;
