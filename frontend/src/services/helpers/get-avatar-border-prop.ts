const getAvatarBorderProp = (bordered: boolean, prop: string | number) : string | number => {
  if (bordered) {
    return prop;
  }
  if (typeof prop === 'number') {
    return 0;
  }
  return 'transparent';
};

export default getAvatarBorderProp;
