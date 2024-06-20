import { uuid } from '../utils/uuid';

const requestId = uuid();
export const addlocalStore = () => {
  const isRequestId = localStorage.getItem('requestId');
  if (isRequestId) return;
  localStorage.setItem('requestId', requestId);
};
