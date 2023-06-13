import API from './api';

export const sendMail = async ({ to, subject, text, html, consosToExport }) => {
  return await API.post({
    path: '/mail',
    body: {
      to,
      subject,
      text,
      html,
      consosToExport,
    },
  }).catch((err) => console.error('send mail error', err));
};
