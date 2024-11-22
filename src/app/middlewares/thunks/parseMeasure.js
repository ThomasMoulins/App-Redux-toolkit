const parseMeasure = (measure) => {
  if (!measure) return { quantity: 1, unit: "" };

  // Supprime les espaces inutiles
  measure = measure.trim();

  // Expression régulière pour capturer les fractions (par exemple, "1/2")
  const fractionRegex = /^(\d+)\s*\/\s*(\d+)/;

  // Expression régulière pour capturer les nombres décimaux ou entiers
  const numberRegex = /^(\d+(\.\d+)?)|\d+$/;

  let quantity = 1;
  let unit = "";

  // Vérifier si la mesure commence par une fraction
  if (fractionRegex.test(measure)) {
    const matches = measure.match(fractionRegex);
    const numerator = parseFloat(matches[1]);
    const denominator = parseFloat(matches[2]);
    quantity = numerator / denominator;
    unit = measure.replace(matches[0], "").trim();
  }
  // Vérifie si la mesure commence par un nombre (entier ou décimal)
  else if (numberRegex.test(measure)) {
    const matches = measure.match(numberRegex);
    quantity = parseFloat(matches[0]);
    unit = measure.replace(matches[0], "").trim();
  }
  // Si la mesure ne commence pas par un nombre, la quantité est 1 et l'unité est le texte complet
  else {
    unit = measure;
  }

  return { quantity, unit };
};

export default parseMeasure;
