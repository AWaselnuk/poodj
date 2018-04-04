import {metricSeriesParser} from './helpers/chart_helpers';

// This method seems to be concerned with install metrics so what the heck is "data"?
function parseInstallMetricsData(data) {
  // Why is a function called parse install metrics also responsible for the state of a GraphQL fetch?
  // How many other places have this dependency on 'loading' and 'error'? (Spoiler: many)
  if (data.loading || data.error) {
    return {};
  }

  // What happens if currentOrganization changes `app`?
  // This is dependency hell waiting to happen
  const {installMetrics, shopReactivatedMetrics} = data.currentOrganization.app;

  const installMetricsSummary = installMetrics.summary;
  const reactivatedShopsSummary = shopReactivatedMetrics.summary;

  const installMetricsData = installMetrics.byDateTime;
  const reactivatedShopsData = shopReactivatedMetrics.byDateTime;

  // So we know that the metrics objects have dateTime data but we need this
  // separate parser function to change that data.
  // I thought this was the parser function? Whose job is parsing anyways?
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
