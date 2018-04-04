import {metricSeriesParser} from './helpers/chart_helpers';

function parseInstallMetricsData(data) {
  // If we want to display a loading state, we need to pass some React component data like {}
  if (data.loading || data.error) {
    return {};
  }

  // What happens if currentOrganization changes `app`?
  const {installMetrics, shopReactivatedMetrics} = data.currentOrganization.app;

  const installMetricsSummary = installMetrics.summary;
  const reactivatedShopsSummary = shopReactivatedMetrics.summary;

  // sort data by date time here ...
  const installMetricsData = installMetrics.byDateTime;
  const reactivatedShopsData = shopReactivatedMetrics.byDateTime;

  // then map over it with some other parser here ...
  const installMetricsSeries = installMetricsData.map(metricSeriesParser);
  const reactivatedShopsSeries = reactivatedShopsData.map(metricSeriesParser);

  return {
    summary: {
      total: installMetricsSummary.total + reactivatedShopsSummary.total,
    },
    series: {
      'Re-opened stores': reactivatedShopsSeries,
      Installs: installMetricsSeries,
    },
  };
}
