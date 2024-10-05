const formatTime = (timeToDisplay) => {
    const time = new Date(`1970-01-01T${timeToDisplay}Z`);
    return time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    });
};

export { formatTime };
