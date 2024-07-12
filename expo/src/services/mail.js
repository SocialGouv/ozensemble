import API from './api';
import { storage } from './storage';

export const sendMail = async ({ to, subject, text, html, attachments = [] }) => {
  return await API.post({
    path: '/mail',
    body: {
      matomoId: storage.getString('@UserIdv2'),
      to,
      subject,
      text,
      html,
      attachments,
    },
  }).catch((err) => console.error('send mail error', err));
};
