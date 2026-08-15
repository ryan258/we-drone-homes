// Interactive Drywall Damage & Fee Estimator Engine
document.addEventListener('DOMContentLoaded', () => {
  const calcForm = document.getElementById('damage-calc-form');
  if (!calcForm) return;

  const sqftInput = document.getElementById('calc-sqft');
  const sqftDisplay = document.getElementById('sqft-val');
  const ceilingInput = document.getElementById('calc-ceiling');
  const chandelierInput = document.getElementById('calc-chandeliers');
  const petsInput = document.getElementById('calc-pets');
  const tierRadios = document.querySelectorAll('input[name="tier"]');
  const addonCheckboxes = document.querySelectorAll('input[name="addons"]');

  // Summary targets
  const summaryBasePrice = document.getElementById('sum-base-price');
  const summaryCeilingFee = document.getElementById('sum-ceiling-fee');
  const summaryChandelierRisk = document.getElementById('sum-chandelier-risk');
  const summarySpackleFee = document.getElementById('sum-spackle-fee');
  const summaryAddons = document.getElementById('sum-addons');
  const summaryTotal = document.getElementById('sum-total');
  const summaryViral = document.getElementById('sum-viral');

  function calculateQuote() {
    const sqft = parseInt(sqftInput.value, 10);
    if (sqftDisplay) sqftDisplay.textContent = `${sqft.toLocaleString()} sq ft`;

    // Base Tier Price
    let baseTier = 499;
    let tierName = "The Gentle Orbit";
    tierRadios.forEach(radio => {
      const parentOption = radio.closest('.tier-option');
      if (radio.checked) {
        baseTier = parseInt(radio.value, 10);
        tierName = radio.dataset.tierName || "Selected Tier";
        if (parentOption) parentOption.classList.add('selected');
      } else {
        if (parentOption) parentOption.classList.remove('selected');
      }
    });

    // Ceiling Height Fee
    const ceilingMultiplier = parseFloat(ceilingInput.value) || 1.0;
    const ceilingFee = Math.round((ceilingMultiplier - 1.0) * 350);

    // Chandelier Density Multiplier & Risk
    const chandelierDensity = parseInt(chandelierInput.value, 10) || 0;
    const chandelierRiskFee = chandelierDensity * 125;

    // Pet Turbulence Surcharge
    const petSurcharge = parseInt(petsInput.value, 10) || 0;

    // Drywall Spackle Deposit based on SqFt and Chandelier count
    const drywallSpackle = Math.round((sqft / 1000) * 45 + (chandelierDensity * 30));

    // Add-ons
    let addonsTotal = 0;
    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        addonsTotal += parseInt(cb.value, 10);
      }
    });

    // Total Calculation
    const total = baseTier + ceilingFee + chandelierRiskFee + petSurcharge + drywallSpackle + addonsTotal;

    // Update DOM
    if (summaryBasePrice) summaryBasePrice.textContent = `$${baseTier.toLocaleString()}`;
    if (summaryCeilingFee) summaryCeilingFee.textContent = `$${ceilingFee.toLocaleString()}`;
    if (summaryChandelierRisk) summaryChandelierRisk.textContent = `$${(chandelierRiskFee + petSurcharge).toLocaleString()}`;
    if (summarySpackleFee) summarySpackleFee.textContent = `$${drywallSpackle.toLocaleString()}`;
    if (summaryAddons) summaryAddons.textContent = `$${addonsTotal.toLocaleString()}`;
    if (summaryTotal) summaryTotal.textContent = `$${total.toLocaleString()}`;

    if (summaryViral) {
      const viralScore = Math.min(99.8, 82 + (chandelierDensity * 3) + (baseTier / 150)).toFixed(1);
      summaryViral.textContent = `⚡ ESTIMATED ZILLOW VIRAL SCORE: ${viralScore}%`;
    }
  }

  // Attach event listeners
  if (sqftInput) sqftInput.addEventListener('input', calculateQuote);
  if (ceilingInput) ceilingInput.addEventListener('change', calculateQuote);
  if (chandelierInput) chandelierInput.addEventListener('change', calculateQuote);
  if (petsInput) petsInput.addEventListener('change', calculateQuote);

  tierRadios.forEach(radio => radio.addEventListener('change', calculateQuote));
  addonCheckboxes.forEach(cb => cb.addEventListener('change', calculateQuote));

  // Initial calculation
  calculateQuote();
});
