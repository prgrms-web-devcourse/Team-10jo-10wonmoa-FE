import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const useApiError = () => {
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
      switch (true) {
        // TODO: 커스텀 에러 핸들러 사용을 위한 코드. 타입설정 후 사용할예정

        // case customHandlers && httpStatus in customHandlers:
        //   customHandlers[httpStatus].default();
        //   break;

        // TODO: 타입지정하여 any 없애기
        case httpStatus in defaultHandlers:
          (defaultHandlers as any)[httpStatus].default();
          break;
        default:
          defaultHandlers.default();
      }
    }
  };
  return { handleError };
};

export default useApiError;
