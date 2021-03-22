import { DEFAULT_PAGE_SIZE } from '../constants';

interface PaginateResultsInput {
  cursor?: number;
  pageSize?: number;
  results: any[];
}

const paginateResults = ({
  cursor,
  pageSize = DEFAULT_PAGE_SIZE,
  results,
}: PaginateResultsInput) => {
  if (pageSize < 1) {
    return [];
  }

  if (typeof cursor === 'undefined') {
    return results.slice(0, Math.min(pageSize, results.length));
  }

  // note: cursors are 1-indexed
  if (cursor <= 0) {
    return results.slice(0, Math.min(pageSize, results.length));
  } else if (cursor >= results.length) {
    return [];
  }

  // case: 0 < cursor < results.length
  return results.slice(cursor, Math.min(cursor + pageSize, results.length));
};

export default paginateResults;
