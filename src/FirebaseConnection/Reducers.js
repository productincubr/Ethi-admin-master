import { unionWith } from 'lodash';

export function messagesReducer(state, action) {
  switch (action.type) {
    case 'add':
      return unionWith(state, action.payload, (a, b) => a.id === b.id).sort(
        (a, b) => {
          const aData = a.data();
          const bData = b.data();
          const aTime = aData.actual_time_date.toDate(); // Convert to JavaScript Date object
          const bTime = bData.actual_time_date.toDate(); // Convert to JavaScript Date object

          const aFormattedTime = aTime.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          });

          const bFormattedTime = bTime.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          });
          return bFormattedTime.localeCompare(aFormattedTime); // Sort in descending order
        }
      );
    default:
      throw new Error('Action type is not implemented!');
  }
}
