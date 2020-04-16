import React from 'react'
import moment from 'moment';
import _ from 'lodash';
const SharedComponent = () => {
    return (
        <div>
            {_.get([1, 2, 3], 0)}
            {moment().format()}
        </div>
    )
}

export default SharedComponent
