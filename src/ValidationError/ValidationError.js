import React from 'react';
import PropTypes from 'prop-types';

export default function ValidationError(props) {
    console.log(props);
    if(props.message) {
        return (
            <div className="error">{props.message}</div>
        );
    }
}

ValidationError.propTypes = {
    props: PropTypes.string
}