import React from "react";

export default class SplineErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log error with additional context
    console.error("SplineErrorBoundary caught error:", error, info);
    // Attach helpful debug data
    try {
      console.log("window.React", window.React);
      console.log("window.__SPLINE_MODULE__", window.__SPLINE_MODULE__);
    } catch (e) {
      // ignore
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
          <div>
            <div className="text-lg font-medium">Spline failed to load</div>
            <div className="text-sm mt-2">Check console for details.</div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
