declare module '*.frag' {
  const src: string;
  export default src;
}

interface Window {
  param: any;
}

declare var window: Window;
