const onError = (err: any) => {
  if (err.response) throw err.response.data;
  else if (err.request) throw 'Server unreachable.';
  throw 'Unknown error occured.';
};

export default onError;
