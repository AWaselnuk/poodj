export default class Grid extends React.PureComponent<Props, State> {
  render () {
    const { seed, size, gap, cellSize } = this.props;
    // Here we can isolate the responsibility of generating the data for the Grid
    // This component becomes responsible for simply rendering the Grid
    // We could probably explore putting seed onto a React Context
    const { data } = new GridData(seed, size);

    const style = {
      gridGap: gap,
      gridTemplateColumns: `repeat(${size}, ${cellSize}px)`
    }

    return (
      <section className="grid" style={style}>
        {flatten(data).map((value, i) => Grid.Cell(value, cellSize, i))}
      </section>
    );
  }

  private static Cell (value: CellProps['value'], cellSize: number = 40, index: number): JSX.Element {
    return <Cell key={index} size={cellSize} value={value} />;
  }
}
