import React, { useState } from 'react';

export default function CustomToast({ message }) {
    const [showToast, setShowToast] = useState(true);

    setTimeout(() => {
        setShowToast(false);
    }, 3000);

    if (!showToast) {
        return null;
    }

    return (
        <div className="custom-toast">
            <span>{message}</span>
        </div>
    );
}
