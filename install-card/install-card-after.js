import {metricSeriesParser} from './helpers/chart_helpers';

// By using an object for 'app' we can ask it for what we want and not care about how it works
// In this domain, it seems reasonable to have an 'App' object that exposes total counts
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

// WARNING: I don't know React very well. If this is crazy please come talk to me and teach me.
class InstallsComponent extends React.Component {
  render() {
    // we could probably take this even further by putting currentOrganization in a context
    const chartData = parseInstallMetricsData(new App(props.currentOrganization.app))

    // React context Provider can deal with loading and error shenanigans and forward it to children
    // See https://reactjs.org/docs/context.html
    // The main point is how might we put the responsibility for detecting fetch state in one place?
    <DataFetchContext.Consumer>
      {fetchState => (
        <Installs loading={fetchState.loading} error={fetchState.error} chartData={chartData} />
      )}
    </DataFetchContext.Consumer>
  }
}
