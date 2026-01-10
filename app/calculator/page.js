import Calculator from '../../components/Calculator';

export default function CalculatorPage() {
  return (
    <div style={{ 
      minHeight: "80vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      paddingTop: "120px", 
      paddingBottom: "40px",
      background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"
    }}>
      <Calculator />
    </div>
  );
}
