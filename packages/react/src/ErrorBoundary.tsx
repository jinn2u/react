import {
  Component,
  ComponentProps,
  ErrorInfo,
  PropsWithChildren,
  PropsWithRef,
  ReactNode,
  forwardRef,
  isValidElement,
  useImperativeHandle,
  useRef,
} from 'react'
import { useErrorBoundaryGroup } from './ErrorBoundaryGroup'
import { isDifferentArray } from './utils'

export type ResetRef = {
  reset?(): void
}

type Props = PropsWithRef<
  PropsWithChildren<{
    resetKeys?: unknown[]
    onReset?(): void
    onError?(error: Error, info: ErrorInfo): void
    fallback: ReactNode | ((props: { error: Error; reset: () => void }) => ReactNode)
  }>
>

type State = {
  error: Error | null
}

const initialState: State = {
  error: null,
}

class BaseErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  state = initialState

  resetErrorBoundary = () => {
    this.props.onReset?.()
    this.reset()
  }

  reset() {
    this.setState(initialState)
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { error } = this.state
    const { resetKeys } = this.props

    if (error !== null && prevState.error !== null && isDifferentArray(prevProps.resetKeys, resetKeys)) {
      this.resetErrorBoundary()
    }
  }

  render() {
    const { error } = this.state
    const { children, fallback } = this.props

    if (error !== null) {
      if (isValidElement(fallback)) {
        return fallback
      }
      if (typeof fallback === 'function') {
        return fallback({
          error,
          reset: this.resetErrorBoundary,
        })
      }
      throw new Error('react-error-boundary requires either a fallback')
    }

    return children
  }
}

export const ErrorBoundary = forwardRef<ResetRef, ComponentProps<typeof BaseErrorBoundary>>((props, resetRef) => {
  const { groupResetKey } = useErrorBoundaryGroup()
  const resetKeys = groupResetKey ? [groupResetKey, ...(props.resetKeys || [])] : props.resetKeys

  const ref = useRef<BaseErrorBoundary | null>(null)
  useImperativeHandle(resetRef, () => ({ reset: () => ref.current?.resetErrorBoundary() }))

  return <BaseErrorBoundary {...props} resetKeys={resetKeys} />
})
