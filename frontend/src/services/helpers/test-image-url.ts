const testImageUrl = (url: string) : boolean => {
  const urlTest = '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=.]+$';
  const imgTest = '.(png|gif|jpe?g|bmp)';
  return !!url.match(urlTest) && !!url.match(imgTest);
};

export default testImageUrl;
