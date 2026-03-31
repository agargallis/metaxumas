import React from 'react'
import AppLoader from './AppLoader'

const SOFT_RETRY_DELAY_MS = 1200
const RETRY_COUNT_RESET_MS = 4000
const MAX_SOFT_RETRIES = 2

export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, retryCount: 0, retryKey: 0 }
    this.retryTimeout = null
    this.retryCountResetTimeout = null
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidMount() {
    this.scheduleRetryCountReset()
  }

  componentDidCatch(error, errorInfo) {
    console.error('App crashed:', error, errorInfo)
    this.scheduleRecovery()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.hasError && this.state.hasError) {
      this.clearRetryCountReset()
      return
    }

    if (prevState.hasError && !this.state.hasError) {
      this.scheduleRetryCountReset()
    }
  }

  componentWillUnmount() {
    this.clearRetry()
    this.clearRetryCountReset()
  }

  clearRetry = () => {
    if (this.retryTimeout !== null) {
      window.clearTimeout(this.retryTimeout)
      this.retryTimeout = null
    }
  }

  clearRetryCountReset = () => {
    if (this.retryCountResetTimeout !== null) {
      window.clearTimeout(this.retryCountResetTimeout)
      this.retryCountResetTimeout = null
    }
  }

  scheduleRetryCountReset = () => {
    this.clearRetryCountReset()
    this.retryCountResetTimeout = window.setTimeout(() => {
      this.setState(current => (current.hasError || current.retryCount === 0 ? null : { retryCount: 0 }))
    }, RETRY_COUNT_RESET_MS)
  }

  scheduleRecovery = () => {
    this.clearRetry()
    this.retryTimeout = window.setTimeout(() => {
      if (this.state.retryCount >= MAX_SOFT_RETRIES) {
        window.location.reload()
        return
      }

      this.setState(current => ({
        hasError: false,
        error: null,
        retryCount: current.retryCount + 1,
        retryKey: current.retryKey + 1,
      }))
    }, SOFT_RETRY_DELAY_MS)
  }

  render() {
    if (!this.state.hasError) {
      return <React.Fragment key={this.state.retryKey}>{this.props.children}</React.Fragment>
    }

    return <AppLoader />
  }
}
