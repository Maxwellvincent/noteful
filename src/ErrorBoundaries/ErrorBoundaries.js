import React, { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }


    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    // componentDidCatch() {

    // }

    render() {
        if(this.state.hasError) {
            return (
                <>
                    <h2>Could not create a new folder</h2>
                </>);
        }
        return this.props.children;

    }
}