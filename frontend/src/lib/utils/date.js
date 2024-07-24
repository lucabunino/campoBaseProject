export function formatDate(date1, date2) {
  // Parse the input dates
  let d1, d2;
  if (date1) {
    d1 = date1 ? new Date(date1) : '';
  } else {
    return {}
  }
  if (date2) {
    d2 = date2 ? new Date(date2) : new Date(date1);
  } else {
    const day1 = d1.getDate().toString().padStart(2, '0');
    const month1 = (d1.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year1 = d1.getFullYear();
    return `${day1}.${month1}.${year1}`;
  }

  // Extract the parts of the dates
  const day1 = d1.getDate().toString().padStart(2, '0');
  const month1 = (d1.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year1 = d1.getFullYear();

  const day2 = d2.getDate().toString().padStart(2, '0');
  const month2 = (d2.getMonth() + 1).toString().padStart(2, '0');
  const year2 = d2.getFullYear();

  // Check if month and year are the same
  if (year1 === year2 && month1 === month2) {
    return `${day1}-${day2}.${month1}.${year1}`;
  } else {
    return `${day1}.${month1}.${year1}-${day2}.${month2}.${year2}`;
  }
}