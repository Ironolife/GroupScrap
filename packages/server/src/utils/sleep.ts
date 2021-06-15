const sleep = (ms = 500) =>
  new Promise<void>((res) => {
    setTimeout(res, ms);
  });

export default sleep;
