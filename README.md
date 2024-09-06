# MultiselectDropdownSearch

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## How to interact:
- Click or `focus + Enter` on the input box triggers the dropdown opening
- `Esc` closes the dropdown
- Once opened,`Arrow Down / Arrow Up` move focus between the list elements
- `Spacebar` or Click trigger element selection (as native checkbox)
- checkboxes are still focusable by `Tab` navigation, but the element won't appear selected (TDB)

## Roles, States, and Properties

- The element that contains or owns the options has role listbox.
- The element with role listbox has aria-labelledby or aria-label.
- The element with role listbox has aria-multiselectable set to true.
- Each option has role option.
- Each selected option has both aria-checked and aria-selected set to true (see Note).
- All options that are not selected have both aria-checked and aria-selected set to false (see Note).

---
**Note**
The [Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) recommends using aria-checked for multiselect listboxes and recommends against using both aria-checked and aria-selected. However, this is not supported by current, leading screen readers, JAWS 2024 and NVDA 2024:

Both screen readers say "not selected" if aria-selected is undefined, so options with only aria-checked="true" are indciated as "checked, not selected", which is incorrect.
Neither screen reader says "selected" if aria-selected="true", making it difficult to identify selected options if only aria-selected is used. (This behavior is designed for single-select listboxes where selection follows focus and "selected" is implied.)
Until leading screen readers change the above behaviors, the only effective solution appears to be to use both aria-checked and aria-selected.

--- 

