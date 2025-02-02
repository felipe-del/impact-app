import './loadingPointsSpinner.css'

const LoadingPointsSpinner = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            backgroundColor: '#f0f4f8',
            color: '#0056b3',
            fontFamily: 'Roboto, sans-serif'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
            </div>
            <p style={{
                fontSize: '18px',
                fontWeight: '500',
                margin: '0',
                marginTop: '10px',
            }}>Cargando...</p>
        </div>
    );
};

export default LoadingPointsSpinner;
