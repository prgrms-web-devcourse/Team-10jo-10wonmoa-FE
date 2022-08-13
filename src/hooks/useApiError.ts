import { default as toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const useApiError = () => {
  const navigate = useNavigate();

  const handle400 = (error: AxiosError) => {
    const message =
      error instanceof AxiosError
        ? error.response?.data.messages
        : '네트워크 서버에 잠시 문제가 있는 것 같아요. 잠시 후 다시 시도해주세요! 🙏';
    toast.error(message);
  };

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
    400: {
      default: handle400,
    },
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

      // TODO: 커스텀 에러 핸들러 사용을 위한 코드. 타입설정 후 사용할예정

      if (httpStatus === 400) {
        handle400(error);
        return;
      }

      if (httpStatus === 401) {
        handle401();
        return;
      }

      if (httpStatus === 403) {
        handle403();
        return;
      }

      if (httpStatus === 404) {
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
