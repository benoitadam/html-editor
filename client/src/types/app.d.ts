// import { VNode } from 'preact';

// declare var _app: any;

// declare module '*.css' {
//   const mapping: Record<string, string>;
//   export default mapping;
// }

// declare module '*.graphql' {
//   const mapping: string;
//   export default mapping;
// }

// declare module 'tinycolor2' {
//   const t: any;
//   export default t;
// }

// declare module '@emotion/styled' {
//   export interface StyledComponent<
//     ComponentProps extends {},
//     SpecificComponentProps extends {} = {},
//     JSXProps extends {} = {}
//   > extends React.FC<ComponentProps & SpecificComponentProps & JSXProps>,
//       ComponentSelector {
//     withComponent<C extends React.ComponentClass<React.ComponentProps<C>>>(
//       component: C
//     ): StyledComponent<
//       ComponentProps & PropsOf<C>,
//       {},
//       { ref?: React.Ref<InstanceType<C>> }
//     >
//     withComponent<C extends React.ComponentType<React.ComponentProps<C>>>(
//       component: C
//     ): StyledComponent<ComponentProps & PropsOf<C>>
//     withComponent<Tag extends keyof JSX.IntrinsicElements>(
//       tag: Tag
//     ): StyledComponent<ComponentProps, JSX.IntrinsicElements[Tag]>
//   }
// }

// declare module '@mui/styled-engine' {
//   export interface StyledComponent<
//     ComponentProps extends {},
//     SpecificComponentProps extends {} = {},
//     JSXProps extends {} = {}
//   > extends React.FC<ComponentProps & SpecificComponentProps & JSXProps>,
//       ComponentSelector {
//     withComponent<C extends React.ComponentClass<React.ComponentProps<C>>>(
//       component: C
//     ): StyledComponent<
//       ComponentProps & PropsOf<C>,
//       {},
//       { ref?: React.Ref<InstanceType<C>> }
//     >
//     withComponent<C extends React.ComponentType<React.ComponentProps<C>>>(
//       component: C
//     ): StyledComponent<ComponentProps & PropsOf<C>>
//     withComponent<Tag extends keyof JSX.IntrinsicElements>(
//       tag: Tag
//     ): StyledComponent<ComponentProps, JSX.IntrinsicElements[Tag]>
//   }
//   export interface CreateStyledComponent<
//     ComponentProps extends {},
//     SpecificComponentProps extends {} = {},
//     JSXProps extends {} = {},
//     T extends object = {},
//   > {
//     (
//       ...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & { theme: T }>>
//     ): StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

//     /**
//      * @typeparam AdditionalProps  Additional props to add to your styled component
//      */
//     <AdditionalProps extends {}>(
//       ...styles: Array<
//         Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps & { theme: T }>
//       >
//     ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;

//     (
//       template: TemplateStringsArray,
//       ...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & { theme: T }>>
//     ): StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

//     /**
//      * @typeparam AdditionalProps  Additional props to add to your styled component
//      */
//     <AdditionalProps extends {}>(
//       template: TemplateStringsArray,
//       ...styles: Array<
//         Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps & { theme: T }>
//       >
//     ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;
//   }

//   export interface CreateMUIStyled<MUIStyledCommonProps, MuiStyledOptions, Theme extends object> {
//     <
//       C extends React.ComponentClass<React.ComponentProps<C>>,
//       ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>,
//     >(
//       component: C,
//       options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps> & MuiStyledOptions,
//     ): CreateStyledComponent<
//       Pick<PropsOf<C>, ForwardedProps> & MUIStyledCommonProps,
//       {},
//       {
//         ref?: React.Ref<InstanceType<C>>;
//       },
//       Theme
//     >;
  
//     <C extends React.ComponentClass<React.ComponentProps<C>>>(
//       component: C,
//       options?: StyledOptions<PropsOf<C> & MUIStyledCommonProps> & MuiStyledOptions,
//     ): CreateStyledComponent<
//       PropsOf<C> & MUIStyledCommonProps,
//       {},
//       {
//         ref?: React.Ref<InstanceType<C>>;
//       },
//       Theme
//     >;
  
//     <
//       C extends React.JSXElementConstructor<React.ComponentProps<C>>,
//       ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>,
//     >(
//       component: C,
//       options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps> & MuiStyledOptions,
//     ): CreateStyledComponent<Pick<PropsOf<C>, ForwardedProps> & MUIStyledCommonProps, {}, {}, Theme>;
  
//     <C extends React.JSXElementConstructor<React.ComponentProps<C>>>(
//       component: C,
//       options?: StyledOptions<PropsOf<C> & MUIStyledCommonProps> & MuiStyledOptions,
//     ): CreateStyledComponent<PropsOf<C> & MUIStyledCommonProps, {}, {}, Theme>;
  
//     <
//       Tag extends keyof JSX.IntrinsicElements,
//       ForwardedProps extends keyof JSX.IntrinsicElements[Tag] = keyof JSX.IntrinsicElements[Tag],
//     >(
//       tag: Tag,
//       options: FilteringStyledOptions<JSX.IntrinsicElements[Tag], ForwardedProps> & MuiStyledOptions,
//     ): CreateStyledComponent<
//       MUIStyledCommonProps,
//       Pick<JSX.IntrinsicElements[Tag], ForwardedProps>,
//       {},
//       Theme
//     >;
  
//     <Tag extends keyof JSX.IntrinsicElements>(
//       tag: Tag,
//       options?: StyledOptions<MUIStyledCommonProps> & MuiStyledOptions,
//     ): CreateStyledComponent<MUIStyledCommonProps, JSX.IntrinsicElements[Tag], {}, Theme>;
//   }
// }

// declare module '@mui/system' {
//   // export type CreateMUIStyled<Theme = any> = any;
//   // export type CreateMUIStyled<T extends object = DefaultTheme> = CreateMUIStyledStyledEngine<
//   //   MUIStyledCommonProps<T>,
//   //   MuiStyledOptions,
//   //   T
//   // >;
// }

// declare module 'react' {
//   export declare namespace React {
//     export type PropsWithChildren<P = unknown> = P & { children?: any };
//     export type ReactNode = any;
//   }
//   export = React;
//   export default React;
// }


// // // export interface StyledComponent<
// // //   ComponentProps extends {},
// // //   SpecificComponentProps extends {} = {},
// // //   JSXProps extends {} = {}
// // // > extends React.FC<ComponentProps & SpecificComponentProps & JSXProps>,
// // //     ComponentSelector {
// // //   withComponent<C extends React.ComponentClass<React.ComponentProps<C>>>(
// // //     component: C
// // //   ): StyledComponent<
// // //     ComponentProps & PropsOf<C>,
// // //     {},
// // //     { ref?: React.Ref<InstanceType<C>> }
// // //   >
// // //   withComponent<C extends React.ComponentType<React.ComponentProps<C>>>(
// // //     component: C
// // //   ): StyledComponent<ComponentProps & PropsOf<C>>
// // //   withComponent<Tag extends keyof JSX.IntrinsicElements>(
// // //     tag: Tag
// // //   ): StyledComponent<ComponentProps, JSX.IntrinsicElements[Tag]>
// // // }


// // export type VNode<P = any> = any;
// // export type ReactNode = any;
// // export type ReactElement = any;
// // export type Element = any;
// // export type FC = any;

// // // declare module 'preact' {
// // //   // export type VNode<P = any> = any;
// // //   export = any;
// // //   export default any;
// // // }

// // declare module 'react' {
// //   // export type Element = any;
// //   // export type ReactElement = any;
// //   // export type ReactNode = any;
// //   // export type FC<P = any> = any;
// //   // export type FunctionComponent<P = any> = any;
// //   // declare namespace React {
// //   //   // type ReactNode1 = VNode<any> | Element | ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;
// //   //   // type ReactNode = ReactNode1|ReactNode1[];
// //   //   // type Toto = number; // ReactNode1|ReactNode1[];

// //   //   export type Element = any;
// //   //   export type ReactElement = any;
// //   //   export type ReactNode = any;
// //   //   export type FC<P = any> = any;
// //   //   export type FunctionComponent<P = any> = any;
// //   // }
// //   // export = any;
// //   // export default any;
// //   export declare namespace React {
// //     export type PropsWithChildren<P = unknown> = P & { children?: any };
// //     export type ReactNode = any;
// //   }
// //   export = React;
// //   export default React;
// // }





// // declare module 'jsx' {
// //   export namespace JSXInternal {
// //     export type Element = any;
// //   }
// //   export = JSXInternal;
// //   export default JSXInternal;
// // }
// // declare module 'preact' {
// //   export namespace JSXInternal {
// //     export type Element = any;
// //   }
// //   export = JSXInternal;
// //   export default JSXInternal;
// // }
// // declare module 'preact/src/jsx' {
// //   export namespace JSXInternal {
// //     export type Element = any;
// //   }
// //   export = JSXInternal;
// //   export default JSXInternal;
// // }

// // declare module 'react' {
// //   export namespace React {
// //     export interface FunctionComponent<P = {}> {
// //       (props: P, context?: any): ReactElement<any, any> | null;
// //       propTypes?: WeakValidationMap<P> | undefined;
// //       contextTypes?: ValidationMap<any> | undefined;
// //       defaultProps?: Partial<P> | undefined;
// //       displayName?: string | undefined;
// //       children: any;
// //     }
// //     export type FC<P = {}> = FunctionComponent<P>;
// //   }
// //   export = React;
// //   export default React;
// // }

// // declare module '@types/react' {
// //   export namespace React {
// //     export interface FunctionComponent<P = {}> {
// //       (props: P, context?: any): ReactElement<any, any> | null;
// //       propTypes?: WeakValidationMap<P> | undefined;
// //       contextTypes?: ValidationMap<any> | undefined;
// //       defaultProps?: Partial<P> | undefined;
// //       displayName?: string | undefined;
// //       children: any;
// //     }
// //     export type FC<P = {}> = FunctionComponent<P>;
// //   }
// //   export = React;
// //   export default React;
// // }

// // declare module '@mui/joy/styles' {
// //   export const styled: any;
// // }

// // declare module '@emotion/styled' {
// //   export const StyledComponent: any;
// // }

// // declare module '@emotion/styled/types/base' {
// //   export const StyledComponent: any;
// // }

// // declare module '@mui/styled-engine' {
// //   export const CreateStyledComponent: any;
// // }

// // import { StyledComponent } from '@emotion/styled/types/base';


// // type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;

// // Impossible d'assigner le type 'Element' au type 'ReactNode'.
// //   La propriété 'children' est absente du type 'VNode<any>' mais obligatoire dans le type 'ReactPortal'.ts(2322)



// // declare namespace React {
// //   type ReactNode1 = Element | ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;
// //   type ReactNode = ReactNode1|ReactNode1[];

  

// //   // interface FunctionComponent<P = {}> {
// //   //   (props: P, context?: any): ReactElement<any, any> | null;
// //   //   propTypes?: WeakValidationMap<P> | undefined;
// //   //   contextTypes?: ValidationMap<any> | undefined;
// //   //   defaultProps?: Partial<P> | undefined;
// //   //   displayName?: string | undefined;
// //   // }
// // }



// // declare global {
// //   type ReactText = string | number;
// //   type ReactChild = ReactElement | ReactText;
  
// //   interface ReactNodeArray extends Array<ReactNode> {}
// //   type ReactFragment = {} | ReactNodeArray;
  
// //   type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

// //   namespace JSX {
// //     interface Element extends React.ReactElement<any, any> { }
// //   }
// // }
