import API from './api';

export const sendMail = async ({ to, subject, text, html }) => {
  return await API.post({
    path: '/mail',
    body: {
      to,
      subject,
      text,
      html,
    },
  }).catch((err) => console.error('send mail error', err));
};
