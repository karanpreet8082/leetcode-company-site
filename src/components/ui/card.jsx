export function Card({ className = '', children }) {
    return <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>;
  }
  
  export function CardContent({ className = '', children }) {
    return <div className={`p-4 ${className}`}>{children}</div>;
  }
  