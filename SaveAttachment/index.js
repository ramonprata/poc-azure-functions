const { NotificationRepository } = require('../shared/NotificationRepository');
const { sendEmail } = require('../shared/EmailService');

module.exports = async function (context, myBlob) {
  try {
    const notificationData = {
      fileURI: context.bindingData.uri,
      fileName: context.bindingData.metadata.fileName,
      description: context.bindingData.metadata.notificationDescription,
    };
    const notificationRepository = new NotificationRepository();
    const insertedId = await notificationRepository.createNotification(notificationData);
    if (insertedId) {
      sendEmail({ insertedId, ...notificationData }, (error, info) => {
        if (error) {
          console.log('ERROR SEND EMAIL:', error);
        } else {
          console.log('EMAIL WAS SENT:', info);
        }
      });
    }
  } catch (error) {
    console.log('error#####:', error);
  }
};
