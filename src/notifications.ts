import { Expo, ExpoPushMessage } from 'expo-server-sdk';

const expo = new Expo();

export async function sendNotification(token: string, mensaje: string) {
  if (!Expo.isExpoPushToken(token)) {
    throw new Error(`Push token ${token} is not a valid Expo push token`);
  }

  const message: ExpoPushMessage = {
    to: token,
    sound: 'default',
    body: mensaje,
    data: { withSome: 'data' },
  };

  try {
    const ticket = await expo.sendPushNotificationsAsync([message]);
    return ticket;
  } catch (error) {
    console.error(error);
    throw error;
  }
}