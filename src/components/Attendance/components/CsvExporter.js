import { useCsvExport } from '../hooks/useCsvExport';

const CsvExporter = ({ data, filter }) => {
  const { exportToCsv } = useCsvExport();
  
  const handleExport = () => {
    exportToCsv(data, filter);
  };
  
  return (
    <button className="export-btn" onClick={handleExport}>
      <i className="icon-download"></i> Export {filter} Data
    </button>
  );
};

export default CsvExporter;