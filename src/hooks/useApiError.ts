import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

// TODO: type
const useApiError = (handlers?: any) => {
  const navigate = useNavigate();

  const handle401 = () => {
    navigate('/login');
  };

  const handle403 = () => {
    navigate('/login');
  };

  const handle404 = () => {
    navigate('/404');
  };

  const defaultHandler = () => {
    window.location.href = '/';
  };

  const errorHandlers = {
    default: defaultHandler,
    401: {
      default: handle401,
    },
    403: {
      default: handle403,
    },
    404: {
      default: handle404,
    },
  };

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      // response가 오지 않는 경우 404 페이지로 리다이렉팅
      if (!error.response) {
        handle404();
        return;
      }

      const httpStatus = error.response.status;

      switch (true) {
        case handlers && handlers[httpStatus]:
          handlers[httpStatus].default();
          break;
        // TODO: type
        case (errorHandlers as any)[httpStatus]:
          (errorHandlers as any)[httpStatus].default();
          break;
        default:
          errorHandlers.default();
      }
    }
  };
  return { handleError };
};

export default useApiError;
