const getPropOnCondition = (
  condition : boolean | undefined,
  baseValue : string,
  conditionalValue: string,
) : string => {
  if (condition) {
    return conditionalValue;
  }
  return baseValue;
};

export default getPropOnCondition;
