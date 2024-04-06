import { Svg, SvgProps } from '@pancakeswap/uikit'
import React from 'react'

export const Step1Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 34 41" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.57026 36.8572C7.52101 39.3914 11.7441 40.8022 16.9869 40.8066H17.0131C22.2559 40.8022 26.479 39.3914 29.4297 36.8572C32.4159 34.2927 34 30.6534 34 26.5355C34 22.5677 32.4193 19.7065 30.6308 17.7725C29.2292 16.2569 27.6825 15.2862 26.6055 14.7278C26.849 13.8896 27.1529 12.7923 27.4247 11.6588C27.7885 10.1422 28.1454 8.36273 28.1454 7.05876C28.1454 5.51533 27.8453 3.9653 27.0363 2.76086C26.1815 1.48834 24.8946 0.806641 23.3465 0.806641C22.1366 0.806641 21.1094 1.30995 20.3052 2.17821C19.5365 3.00815 19.0249 4.11033 18.6716 5.25928C18.0509 7.27819 17.8092 9.81464 17.7414 12.3459H16.2586C16.1908 9.81464 15.9491 7.27819 15.3284 5.25927C14.9751 4.11033 14.4635 3.00815 13.6948 2.17821C12.8906 1.30995 11.8634 0.806641 10.6535 0.806641C9.10539 0.806641 7.81854 1.48834 6.96375 2.76086C6.15469 3.9653 5.85462 5.51533 5.85462 7.05876C5.85462 8.36273 6.21148 10.1422 6.57525 11.6588C6.84711 12.7923 7.15097 13.8896 7.39452 14.7278C6.31752 15.2862 4.77079 16.2569 3.36916 17.7725C1.58065 19.7065 0 22.5677 0 26.5355C0 30.6534 1.58413 34.2927 4.57026 36.8572ZM15.2619 22.5666V34.14H19.0937V18.88L12.7391 19.8133V22.9633L15.2619 22.5666Z"
      />
    </Svg>
  )
}
