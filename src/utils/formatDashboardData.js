exports.formatDashboardData = (risks) => {
  // Calculate statistics
  const totalRisks = risks.length;
  const criticalRisks = risks.filter(r => r.riskLevel === 'Critical').length;
  const highRisks = risks.filter(r => r.riskLevel === 'High').length;
  const mediumRisks = risks.filter(r => r.riskLevel === 'Medium').length;
  const lowRisks = risks.filter(r => r.riskLevel === 'Low').length;

  const totalEAL = risks.reduce((sum, r) => sum + r.expectedAnnualLoss, 0);
  const averageRiskScore = risks.length > 0 ? risks.reduce((sum, r) => sum + r.riskScore, 0) / risks.length : 0;

  return {
    summary: {
      totalRisks,
      criticalRisks,
      highRisks,
      mediumRisks,
      lowRisks,
      totalExpectedAnnualLoss: totalEAL.toFixed(2),
      averageRiskScore: averageRiskScore.toFixed(2)
    },
    riskDistribution: {
      Critical: criticalRisks,
      High: highRisks,
      Medium: mediumRisks,
      Low: lowRisks
    },
    topRisks: risks
      .sort((a, b) => b.riskScore - a.riskScore)
      .slice(0, 10)
      .map(r => ({
        asset: r.asset.name,
        vulnerability: r.vulnerability.name,
        riskScore: r.riskScore,
        riskLevel: r.riskLevel,
        eal: r.expectedAnnualLoss.toFixed(2)
      })),
    allRisks: risks
  };
};