import React from 'react';
import { useReactToPrint } from 'react-to-print';
import '../styles/components.css';

const PDFGenerator = ({ contentRef, trigger }) => {
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  return React.cloneElement(trigger, { onClick: handlePrint });
};

export default PDFGenerator;