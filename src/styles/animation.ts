import { css } from '@emotion/react';

const animation = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes bounce {
    0% {
      top: 0;
    }
    50% {
      top: -5px;
    }
    70% {
      top: -50px;
    }
    100% {
      top: 0;
    }
  }

  @-moz-keyframes bounce {
    0% {
      top: 0;
    }
    50% {
      top: -5px;
    }
    70% {
      top: -50px;
    }
    100% {
      top: 0;
    }
  }

  @-o-keyframes bounce {
    0% {
      top: 0;
    }
    50% {
      top: -5px;
    }
    70% {
      top: -50px;
    }
    100% {
      top: 0;
    }
  }

  @-ms-keyframes bounce {
    0% {
      top: 0;
    }
    50% {
      top: -5px;
    }
    70% {
      top: -50px;
    }
    100% {
      top: 0;
    }
  }

  @keyframes bounce {
    0% {
      top: 0;
    }
    50% {
      top: -5px;
    }
    70% {
      top: -50px;
    }
    100% {
      top: 0;
    }
  }

  .fadeIn {
    animation: fadeIn 0.5s;
    -moz-animation: fadeIn 0.5s;
    -webkit-animation: fadeIn 0.5s;
  }

  .bounce {
    position: relative;
    -moz-animation: bounce 0.5s 2 linear;
    -webkit-animation: bounce 0.5s 2 linear;
    -o-animation: bounce 0.5s 2 linear;
    animation: bounce 0.5s 2 linear;
  }
`;

export default animation;
