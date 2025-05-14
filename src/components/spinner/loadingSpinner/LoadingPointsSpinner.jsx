/**
 * LoadingPointsSpinner Component
 * 
 * This component renders a loading spinner with three dots and a loading message.
 * It is used to indicate that data is being loaded or processed.
 */
import './loadingPointsSpinner.css'

/**
 * LoadingPointsSpinner component that displays a loading spinner with three dots and a loading message.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.loading - Indicates whether the spinner is loading or not.
 * @returns {JSX.Element} The rendered LoadingPointsSpinner component.
 */
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
