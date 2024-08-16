export const formatAddress = (address) => {
  if (!address) return "No Address";
  return `${address.slice(0, 5)}...${address.slice(-3)}`;
};
