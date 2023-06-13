import API from './api';

export const sendMail = async ({ to, subject, text, html, fileContent, fileName, fileType }) => {
  return await API.post({
    path: '/mail',
    body: {
      to,
      subject,
      text,
      html,
      fileContent,
      fileName,
      fileType,
    },
  }).catch((err) => console.error('send mail error', err));
};
