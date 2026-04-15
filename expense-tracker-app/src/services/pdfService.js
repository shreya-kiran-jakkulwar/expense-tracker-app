// ========================================
// PDF SERVICE
// Export dashboard as PDF using jsPDF + html2canvas
// ========================================

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Export the dashboard content as a PDF
 * @param {string} elementId - The ID of the DOM element to capture
 * @param {string} filename - Output filename
 * @returns {Promise<void>}
 */
export const exportDashboardAsPDF = async (elementId = 'dashboard-content', filename = 'BudgetBuddy_Dashboard') => {
  const element = document.getElementById(elementId);

  if (!element) {
    throw new Error('Dashboard content element not found');
  }

  try {
    // Capture the element as a canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Calculate PDF dimensions
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    const pdf = new jsPDF('p', 'mm', 'a4');

    // Add header
    pdf.setFontSize(20);
    pdf.setTextColor(99, 102, 241); // Primary color
    pdf.text('BudgetBuddy', 15, 15);

    pdf.setFontSize(10);
    pdf.setTextColor(100, 116, 139); // Muted color
    pdf.text(`Generated on ${new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}`, 15, 22);

    // Add line separator
    pdf.setDrawColor(226, 232, 240);
    pdf.line(15, 25, 195, 25);

    // Add dashboard image
    const xOffset = (pdfWidth - scaledWidth) / 2;
    pdf.addImage(imgData, 'PNG', xOffset, 30, scaledWidth, scaledHeight);

    // Add footer
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(148, 163, 184);
      pdf.text(
        `BudgetBuddy • Page ${i} of ${pageCount}`,
        pdfWidth / 2,
        pdfHeight - 10,
        { align: 'center' }
      );
    }

    // Download
    pdf.save(`${filename}.pdf`);

    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
};
