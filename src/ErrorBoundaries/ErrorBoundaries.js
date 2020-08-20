import React, { Component } from "react";
import PropType from 'prop-types';
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
        console.log(this.props);
        if(this.state.hasError) {
            return (
                <>
                    <h2>Could not create a new folder</h2>
                </>);
        }
        return this.props.children;

    }
}

ErrorBoundary.propTypes = {
    hasError: PropType.bool
}