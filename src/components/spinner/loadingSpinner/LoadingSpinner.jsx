/**
 * LoadingSpinner component
 * 
 * This component renders a loading spinner with a loading message.
 * It is used to indicate that data is being loaded or processed.
 * It can be used in various parts of the application where loading is required.
 * It is a simple and reusable component that can be customized as needed.
 */
import './loadingSpinner.css'

/**
 * LoadingSpinner component that displays a loading spinner and a loading message.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.loading - Indicates whether the spinner is loading or not.
 * @returns {JSX.Element} The rendered LoadingSpinner component.
 */
const LoadingSpinner = () => {
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
            <div className="spinner" style={{
                width: '50px',
                height: '50px',
                border: '5px solid #ccc',
                borderTop: '5px solid #0056b3',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '20px'
            }} />
            <p style={{
                fontSize: '18px',
                fontWeight: '500',
                margin: '0'
            }}>Cargando...</p>
        </div>
    );
};

export default LoadingSpinner;
