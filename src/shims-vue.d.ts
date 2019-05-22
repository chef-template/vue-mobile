declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface Window {
  AEJSBridge: any
  VConsole: any
  Sentry: any
  wx: any
  QC: any
  lib: any
  Swiper: any
  __wxjs_environment: any
}

declare module 'blueimp-md5' {
  const m: any
  export default m
}

declare module 'progressbar.js' {
  const m: any
  export default m
}