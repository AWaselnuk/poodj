import React from 'react';
import {Card, Stack, Subheading, TextStyle} from '@shopify/polaris';
import {BarChart} from 'polaris-charts';
import {metricSeriesParser} from './helpers/chart_helpers';
import MetricCardHeader from './MetricCardHeader';
import Loader from '../loader';
import {MetricCardProps} from '.';

const INSTALLS_CARD_HEADINGS = {
  cardTitle: 'Installs',
  chartTitle: 'Installs over time',
  metricLabel: 'Installs',
};

function parseInstallMetricsData(data) {
  if (data.loading || data.error) {
    return {};
  }

  const {installMetrics, shopReactivatedMetrics} = data.currentOrganization.app;

  const installMetricsSummary = installMetrics.summary;
  const reactivatedShopsSummary = shopReactivatedMetrics.summary;

  const installMetricsData = installMetrics.byDateTime;
  const reactivatedShopsData = shopReactivatedMetrics.byDateTime;

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

export function InstallCard({data, period, isLoading, dateRange, timezone}) {
  const {cardTitle, chartTitle, metricLabel} = INSTALLS_CARD_HEADINGS;
  const {summary, series} = parseInstallMetricsData(data);

  return (
    <Card>
      <Card.Section>
        <Loader loading={isLoading}>
          <Stack vertical>
            <MetricCardHeader
              title={cardTitle}
              metricLabel={metricLabel}
              summary={summary}
              dateRange={dateRange}
            />
            <Subheading>
              <TextStyle variation="subdued">{chartTitle}</TextStyle>
            </Subheading>
            <BarChart series={series} options={period} timezone={timezone} />
          </Stack>
        </Loader>
      </Card.Section>
    </Card>
  );
}

InstallCard.propTypes = MetricCardProps;
