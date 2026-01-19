import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        error: null
    };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-10 text-red-500 bg-gray-900 min-h-screen">
                    <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
                    <pre className="bg-black p-4 rounded overflow-auto">
                        {this.state.error?.toString()}
                        {this.state.error?.stack}
                    </pre>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
