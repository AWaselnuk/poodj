// Excerpt from test suite:
setup(() => {
  const page = fixture.load('billing_cycle_list.html')[0];
  controlNode = page.querySelector(CONTROL_SELECTOR);

  // This makes it clear that this constructor does nothing except side effects in the DOM
  // If it had a useful interface, this line would have saved the instance in a variable
  // for later use in the test suite
  new BillingCycleControl(controlNode);
});
// /////////////////////////

// I like this pattern because it makes dependencies on DOM very explicit and easy to find
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

// This exposes no useful API. It simply alters DOM behaviour.
// We probably didn't need to create a class at all
// Either way, let's be more clear about the public interface
export default class BillingCycleControl {
  constructor(node) {
    this.node = node;
    this.items = this.node.querySelectorAll(`.${CLASSES.ITEM}`);

    this.clearSelection = this.clearSelection.bind(this);

    Array.from(this.items).forEach((item) => {
      item.addEventListener('click', this._handleItemClick.bind(this, item));
    });
  }

  // This is private
  _handleItemClick(item) {
    this._clearSelection();
    item.classList.add(CLASSES.SELECTED);
    const selectedInput = item.querySelector('input');
    selectedInput.checked = true;
    toggleSelectedPeriodElements(selectedInput.value);
  }

  // This is private
  _clearSelection() {
    Array.from(this.items).forEach((item) =>
      item.classList.remove(CLASSES.SELECTED),
    );
  }
}

// Alternative approach: Move private methods outside the class
// ES modules will make this function scoped only to this file
// This would be a good first refactor towards deleting the class and just exposing a function
clearSelection(itemNodes) {
  Array.from(item.Nodes).forEach((item) =>
    item.classList.remove(CLASSES.SELECTED),
  );
}
