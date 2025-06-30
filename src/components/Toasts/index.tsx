import { toast, type ToastOptions } from 'react-toastify';

const baseOptions: ToastOptions = {
  position: 'top-center',
  style: {
    marginTop: '20px',
  },
  autoClose: 2000,
  hideProgressBar: false,
  pauseOnHover: true,
  draggable: true,
};

export const notifySuccess = (msg: string, opts?: ToastOptions) =>
  toast.success(msg, { ...baseOptions, ...opts });

export const notifyError = (msg: string, opts?: ToastOptions) =>
  toast.error(msg, { ...baseOptions, ...opts });

export const notifyInfo = (msg: string, opts?: ToastOptions) =>
  toast.info(msg, { ...baseOptions, ...opts });

export const notifyWarning = (msg: string, opts?: ToastOptions) =>
  toast.warn(msg, { ...baseOptions, ...opts });
