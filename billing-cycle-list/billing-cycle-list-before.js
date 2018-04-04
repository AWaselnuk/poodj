// A class that helps hide and show parts of a billing form depending on your selections

// Excerpt from test suite:
setup(() => {
  const page = fixture.load('billing_cycle_list.html')[0];
  controlNode = page.querySelector(CONTROL_SELECTOR);
  new BillingCycleControl(controlNode);
});
// /////////////////////////

const CLASSES = {
  ITEM: 'ui-radio-button-list__item',
  SELECTED: 'ui-radio-button-list__item--selected',
  HIDDEN: 'billing-period-hidden',
};

function toggleSelectedPeriodElements(selectedPeriod) {
  const periodElements = document.querySelectorAll('[data-period]');
  Array.from(periodElements).forEach((element) =>
    element.classList.add(CLASSES.HIDDEN),
  );

  const selectedPeriodElements = document.querySelectorAll(
    `[data-period=${selectedPeriod}]`,
  );
  Array.from(selectedPeriodElements).forEach((element) =>
    element.classList.remove(CLASSES.HIDDEN),
  );
}

export default class BillingCycleControl {
  constructor(node) {
    this.node = node;
    this.items = this.node.querySelectorAll(`.${CLASSES.ITEM}`);

    this.clearSelection = this.clearSelection.bind(this);

    Array.from(this.items).forEach((item) => {
      item.addEventListener('click', this.handleItemClick.bind(this, item));
    });
  }

  handleItemClick(item) {
    this.clearSelection();
    item.classList.add(CLASSES.SELECTED);
    const selectedInput = item.querySelector('input');
    selectedInput.checked = true;
    toggleSelectedPeriodElements(selectedInput.value);
  }

  clearSelection() {
    Array.from(this.items).forEach((item) =>
      item.classList.remove(CLASSES.SELECTED),
    );
  }
}
