function validateCreateDishBody(body, context) {
  if (!body.description) {
    return {
      isNotificationValid: false,
      status: 400,
      body: 'Notification description is required! ',
    };
  }
  return {
    isNotificationValid: true,
  };
}

module.exports = { validateCreateDishBody };
