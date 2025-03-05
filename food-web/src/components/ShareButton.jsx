import React from 'react';

const ShareButton = () => {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Website',
                    text: 'Check out this cool website!',
                    url: window.location.href,
                });
                console.log('Thanks for sharing!');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    };

    return (
        <button className='btn btn-primary' onClick={handleShare}>
            Share
        </button>
    );
};

export default ShareButton;
