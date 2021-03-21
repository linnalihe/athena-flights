const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return `${month} ${day}, ${year}`;
};

export default formatDate;
