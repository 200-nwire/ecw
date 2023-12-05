export function getFormattedDate(timestamp: string | number, showTime = false) {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  
    if (!showTime) return formattedDate;
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formatMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${formatMinutes} ${formattedDate}`;
}

export function getFormattedTime(timestamp: string | number) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formatMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${formatMinutes}`;
}
  