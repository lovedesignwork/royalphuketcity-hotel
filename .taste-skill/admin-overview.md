# Admin overview design notes

Direction: Taste framed-sheet, seed 319042124. No redraw. Existing Marcellus/Inter typography and bronze brand retained; warm stone frame, white work sheet, one bronze chart series. The generic sell-out signature from the style draw does not match available hotel data; a three-brand guest desk directory supplies the product-specific element instead.

Main question: what guest work needs attention, and how is the hotel website performing?

Data and jobs:
- Hotel inquiry count and five latest records come from the existing protected inquiries API.
- New inquiry count uses the full filtered API total, rather than counting a five-record preview.
- Latest messages show real names, subjects, statuses and dates; no sample records.
- Yan Long, TWIST and spa each retain direct reservations and inquiries routes.
- Today metrics retain the existing stats API's day boundary.
- Seven-day and thirty-day metrics are explicitly rolling periods.
- Daily chart dates are UTC, matching the existing API grouping; activity times show Bangkok/ICT.
- Top pages represent the existing thirty-day stats response.
- Missing data uses dashes and loading copy; refresh errors keep the previous successful snapshot.
- Successful retrieval controls the update timestamp; overlapping requests are prevented and unmounted requests are aborted.

Implementation:
- Shared admin frame, 220px sidebar, 32px desktop rows, 48px top bar.
- Small screens use a native modal navigation dialog with focus containment and Escape handling; mobile navigation targets are 44px.
- Hidden blog links remain hidden. Public marketing navigation is not rendered underneath admin pages.
- TrafficChart adapts the Taste charts.js bars/ticks helper to React with ResizeObserver cleanup and keyboard-readable bars.
- Form controls were not added or changed; no raw select or number inputs were introduced.

Validation:
- Targeted ESLint and TypeScript checks pass.
- Existing regression suite: 68 tests pass, plus its nested script checks.
- Taste source lint: zero failures and warnings.
- Impeccable source detector: no findings; regex-only coverage acknowledged.
- Rendered inspection uses the authorized CUA browser instead of Taste's standalone CDP inspector.
- Checked desktop, tablet (767 CSS px) and phone (390 CSS px); no horizontal sheet overflow. Measured rendered text contrast has no ratios below 4.5:1 on the overview.
- Mobile TWIST navigation closes the dialog and displays its live empty state.

Scope: local admin shell and overview. Existing backend analytics aggregation and other admin page interiors are preserved. No deployment or database writes.
- Keyboard bar inspection, Escape dismissal with focus return, and manual refresh verified in browser. Browser console reports no errors.
