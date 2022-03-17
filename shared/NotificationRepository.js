const { createConnection } = require('../shared/mongo');

const COLLECTION_NAME = 'Notifications';

class NotificationRepository extends BASEMODEL {
  db;
  connection;

  async createNotification(notification) {
    try {
      const { db, connection } = await createConnection();

      const Notifications = db.collection(COLLECTION_NAME);
      const { insertedId } = await Notifications.insertOne(notification);

      connection.close();

      return insertedId;
    } catch (error) {
      console.log('error createNotification:>>>>', error);
    }
  }

  async getNotifications() {
    try {
      const { db, connection } = await createConnection();

      const Notifications = db.collection(COLLECTION_NAME);
      const notifications = await Notifications.find({}).toArray();

      connection.close();
      return notifications.map((notification) => ({
        ...notification,
        _id: notification._id.toString(),
      }));
    } catch (error) {
      console.log('error getNotifications>>>>>>>>:', error);
    }
  }
}

module.exports = {
  NotificationRepository,
};
