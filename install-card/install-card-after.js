import {metricSeriesParser} from './helpers/chart_helpers';

// By dealing with an object we can ask it for what we want and not care about how it works
// In this domain, it is perfectly reasonable to have an 'App' object that exposes total counts
// as well as relevant app data and methods to organize it.

// This is now easy to test, concerned only with parsing, and further decoupled from the API structure

function parseInstallMetricsData(appWithData) {
  return {
    summary: {
      total: appWithData.totalInstalls + appWithData.totalReactivatedShops
    },
    series: {
      // A metric series is just a tuple with a timestamp and value: [timestamp, value]
      'Re-opened stores': appWithData.reactivatedShops.orderByDateTime().asMetricSeries(),
      Installs: appWithData.installs.orderByDateTime().asMetricSeries(),
    },
  };
}

class InstallsComponent extends React.Component {
  render() {
    // we could probably take this even further by putting currentOrganization in a context
    const chartData = parseInstallMetricsData(new App(props.currentOrganization.app))

    // React context Provider can deal with loading and error shenanigans and forward it to children
    // See https://reactjs.org/docs/context.html
    <DataFetchContext.Consumer>
      {fetchState => (
        <Installs loading={fetchState.loading} error={fetchState.error} chartData={chartData} />
      )}
    </DataFetchContext.Consumer>
  }
}
