export const formatNumber = (value) => {
  const formattedValue = value.replace(/-/g, '');
  let formattedNumber = '';
  for (let i = 0; i < formattedValue.length; i++) {
    let charValue = formattedValue.charAt(i);
    if (i > 0 && i % 2 === 0) formattedNumber += '-';
    if (!isNaN(+charValue) && charValue !== '-') formattedNumber += charValue;
  }
  return formattedNumber;
};
