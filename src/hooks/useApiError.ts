import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

type Handler = {
  [status: number]: {
    default: (error: AxiosError) => void;
  };
};

const useApiError = (handlers?: Handler) => {
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
    navigate('/404');
  };

  const defaultHandlers = {
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
        return;
      }

      const httpStatus = error.response.status;

      if (handlers) {
        if (handlers[httpStatus]) {
          handlers[httpStatus].default(error);
          return;
        }
      } else if (httpStatus === 401) {
        handle401();
        return;
      } else if (httpStatus === 403) {
        handle403();
        return;
      } else if (httpStatus === 404) {
        handle404();
        return;
      }

      defaultHandlers.default();
      return;
    }
  };
  return { handleError };
};

export default useApiError;
