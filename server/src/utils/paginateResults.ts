import { DEFAULT_PAGE_SIZE } from '../constants';

interface PaginateResultsInput {
  cursor?: number;
  pageSize?: number;
  results: any[];
  getCursor?: any;
}

const paginateResults = ({
  cursor,
  pageSize = DEFAULT_PAGE_SIZE,
  results,
  getCursor = () => null,
}: PaginateResultsInput) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex((item) => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};

export default paginateResults;
