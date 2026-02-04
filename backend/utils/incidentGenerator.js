const generateIncidentSeriesID = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  
  let result = "";

  // 1. Generate first 3 letters (e.g., INC)
  // Architect Tip: You can hardcode "INC" if you want every ticket to start the same
  for (let i = 0; i < 3; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // 2. Generate 5 random numbers
  for (let i = 0; i < 5; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return result; // Result example: INC91829 or XYZ44102
};