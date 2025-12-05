import { toast } from 'react-toastify';

export const notifySuccess = (msg) => toast.success(msg || 'Success', {
  icon: '✅',
  pauseOnHover: true,
});

export const notifyError = (msg) => toast.error(msg || 'Something went wrong', {
  icon: '❌',
  pauseOnHover: true,
});

export const notifyInfo = (msg) => toast.info(msg || 'Info', {
  icon: 'ℹ️',
});
