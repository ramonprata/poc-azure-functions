function tokenValidator(req) {
  const accesToken = req.headers.access_token;

  if (!accesToken) {
    return {
      isTokenValid: false,
      status: 400,
      body: 'Access token is required! ',
    };
  } else {
    return {
      isTokenValid: true,
    };
  }
}

module.exports = {
  tokenValidator,
};
