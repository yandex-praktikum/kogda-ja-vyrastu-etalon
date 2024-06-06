const getOptionalProp = (prop: string, value: string | null | undefined) : string => (value ? `${prop}: ${value}` : '');

export default getOptionalProp;
