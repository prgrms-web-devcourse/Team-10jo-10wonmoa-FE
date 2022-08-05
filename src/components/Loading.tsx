import { BackupLayer, Spinner } from '@components';
import { useIsMutating } from 'react-query';
const Loading = () => {
  const isMutating = useIsMutating();

  return (
    <BackupLayer visible={isMutating !== 0}>
      <Spinner />
    </BackupLayer>
  );
};

export default Loading;
