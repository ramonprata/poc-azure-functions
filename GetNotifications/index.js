const { NotificationRepository } = require('../shared/NotificationRepository');

async function getNotifications(context, req) {
  try {
    const notificationRepository = new NotificationRepository();
    const notifications = await notificationRepository.getNotifications();
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: notifications,
    };
  } catch (error) {}
}

module.exports = getNotifications;
