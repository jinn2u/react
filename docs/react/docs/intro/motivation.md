---
sidebar_position: 1
title: Motivation
---

You may wrap [React's Suspense](https://reactjs.org/docs/react-api.html#reactsuspense), [error-boundary](https://reactjs.org/docs/error-boundaries.html) to use them in your projects. because of below reasons.

### Sometimes, Suspense need to avoid SSR under React 18

If you have used React.Suspense in SSR environment like Next.js, you may encounter error like below.
![Example banner](./../../static/img/suspense-in-ssr-error.png)

It's why [Suspense](https://react.suspensive.org/docs/reference/Suspense) containing CSROnly mode is added in this library.

### ErrorBoundary more simply

[bvaughn/react-error-boundary](https://github.com/bvaughn/react-error-boundary) that provide ErrorBoundary is popular library to use React's error-boundary concept declaratively.
ErrorBoundary of bvaughn/react-error-boundary have fallback props named like FallbackComponent, fallbackRender, fallback.

I want to make ErrorBoundary's interface about fallback more simply like only fallback in ErrorBoundary of @suspensive/react

It's why [ErrorBoundary](https://react.suspensive.org/docs/reference/ErrorBoundary) is added in this library.

### Merging Suspense and ErrorBoundary

If Promise have pending, not only success also failure need to be treated at once easily.
so, I want to make a component wrapping Suspense, ErrorBoundary. also CSROnly mode is required to use this component in SSR environment like Next.js

It's why [AsyncBoundary](https://react.suspensive.org/docs/reference/AsyncBoundary) containing CSROnly mode is added in this library.

### Resetting ErrorBoundaries outside of fallback

To reset ErrorBoundary, you can use reset, fallback prop of ErrorBoundary.
but If you want to reset multiple ErrorBoundaries outside of its fallback, you have to provide new element of resetKeys to props of each ErrorBoundaries. but If you use ErrorBoundaryGroup, You don't need to do this tiresome. ErrorBoundaryGroup will reset multiple ErrorBoundary easily.

It's why [ErrorBoundaryGroup](https://react.suspensive.org/docs/reference/ErrorBoundary#errorboundarygroup) is added in this library.

## Visualization

I made [Concepts Visualization](https://visualization.suspensive.org/react) that whoever can understand core concepts of Suspensive(Suspense, ErrorBoundary, AsyncBoundary, ErrorBoundaryGroup) visually. You can interact this site now.

### First, See how boundaries do

1. How [Suspense](https://react.suspensive.org/docs/reference/Suspense) treat loading and success at once in multiple fetching.
2. How [ErrorBoundary](https://react.suspensive.org/docs/reference/ErrorBoundary) treat error at once and how to reset. and what resetKeys do.
3. How [AsyncBoundary](https://react.suspensive.org/docs/reference/AsyncBoundary) treat loading, success and error at once.
4. How [ErrorBoundaryGroup](https://react.suspensive.org/docs/reference/ErrorBoundary#errorboundarygroup) reset multiple ErrorBoundaries without using resetKeys easily.

[**🔗 Click here to see Visualization**](https://visualization.suspensive.org/react)

[**🔗 Click here to see Repository containing source with Suspensive**](https://github.com/suspensive/visualization.suspensive.org/blob/main/pages/react.tsx)

![Visualization Core Concepts](./../../static/gif/visualization-core-concepts.gif)
