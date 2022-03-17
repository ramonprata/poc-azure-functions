const { tokenValidator } = require('../shared/validators');
const { validateCreateDishBody } = require('./createNotificationValidator');
const { NotificationRepository } = require('../shared/NotificationRepository');
const { sendEmail } = require('../shared/EmailService');

async function createNotification(context, req) {
  try {
    const { isTokenValid, ...validatorTokenResponse } = tokenValidator(req);
    if (!isTokenValid) {
      context.res = validatorTokenResponse;
    } else {
      const { isNotificationValid, ...response } = validateCreateDishBody(req.body);
      if (!isNotificationValid) {
        context.res = response;
      } else {
        const notificationRepository = new NotificationRepository();
        const insertedId = await notificationRepository.createNotification(req.body);
        // chamar firebase SDK ADMIN e enviar push notification
        sendEmail((error, info) => {
          if (error) {
            console.log('ERROR SEND EMAIL:', error);
          } else {
            context.res = {
              status: 201,
              body: {
                createdID: insertedId.toString(),
              },
            };
          }
        });
      }
    }
  } catch (error) {
    console.log('error:', error);
    context.res = {
      status: 500,
      body: 'Error creating a new Dish',
    };
  }
}
module.exports = createNotification;
