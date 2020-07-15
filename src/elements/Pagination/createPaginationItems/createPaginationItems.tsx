/**
 * @param {object} rawOptions
 * @param {number|string} rawOptions.activePage
 * @param {number|string} rawOptions.boundaryRange Number of always visible pages at the beginning and end.
 * @param {boolean} rawOptions.hideEllipsis Marks if ellipsis should be hidden.
 * @param {number|string} rawOptions.siblingRange Number of always visible pages before and after the current one.
 * @param {number|string} rawOptions.totalPages Total number of pages.
 */
interface Options {
  activePage: number;
  boundaryRange: number;
  hideEllipsis: boolean;
  siblingRange: number;
  totalPages: number;
}

type Item = { active: boolean; type: string; value: number; };
type Items = Item[];
type Factory = (page: number) => Item;

export const createPaginationItems = ({ activePage, boundaryRange, hideEllipsis, siblingRange, totalPages }: Options): Items => {

  const pageFactory = createPageFactory(activePage);

  const innerRange = 1 + (hideEllipsis ? 0 : 2) + (2 * siblingRange) + (2 * boundaryRange) >= totalPages
    ? createSimpleRange(1, totalPages, pageFactory)
    : createComplexRange({ activePage, boundaryRange, hideEllipsis, siblingRange, totalPages }, pageFactory);

  return [
    createFirstPage(),
    createPrevItem(activePage),
    ...innerRange,
    createNextItem(activePage, totalPages),
    createLastItem(totalPages),
  ];
};

//
//
//
const createSimpleRange = (start: number, end: number, pageFactory: Factory) => Array.from({ length: end - start + 1 }, (_: any, index: number) => pageFactory(start + index));

//
//
//
const createComplexRange = ({ activePage, boundaryRange, hideEllipsis, siblingRange, totalPages }: Options, pageFactory: Factory): Items => {

  const ellipsisSize = hideEllipsis ? 0 : 1;
  const firstGroupEnd = boundaryRange;
  const firstGroup = createSimpleRange(1, firstGroupEnd, pageFactory);

  const lastGroupStart = totalPages + 1 - boundaryRange;
  const lastGroup = createSimpleRange(lastGroupStart, totalPages, pageFactory);

  const innerGroupStart = Math.min(
    Math.max(activePage - siblingRange, firstGroupEnd + ellipsisSize + 1),
    lastGroupStart - ellipsisSize - 2 * siblingRange - 1,
  );
  const innerGroupEnd = innerGroupStart + 2 * siblingRange;
  const innerGroup = createSimpleRange(innerGroupStart, innerGroupEnd, pageFactory);

  return [
    ...firstGroup,
    !hideEllipsis && createInnerPrefix(firstGroupEnd, innerGroupStart, pageFactory),
    ...innerGroup,
    !hideEllipsis && createInnerSuffix(innerGroupEnd, lastGroupStart, pageFactory),
    ...lastGroup,
  ].filter(Boolean) as Items;
};

//
//
//
const createInnerPrefix = (firstGroupEnd: number, innerGroupStart: number, pageFactory: Factory) => {
  const prefixPage = innerGroupStart - 1;
  const showEllipsis = prefixPage !== firstGroupEnd + 1;
  const prefixFactory = showEllipsis ? createEllipsisItem : pageFactory;

  return prefixFactory(prefixPage);
};

//
//
//
const createInnerSuffix = (innerGroupEnd: number, lastGroupStart: number, pageFactory: Factory) => {
  const suffixPage = innerGroupEnd + 1;
  const showEllipsis = suffixPage !== lastGroupStart - 1;
  const suffixFactory = showEllipsis ? createEllipsisItem : pageFactory;

  return suffixFactory(suffixPage);
};

/**
 * @param {number} pageNumber
 * @return {Object}
 */
const createEllipsisItem = (pageNumber: number) => ({ active: false, type: 'ellipsisItem', value: pageNumber });

/**
 * @return {Object}
 */
const createFirstPage = () => ({ active: false, type: 'firstItem', value: 1 });

/**
 * @param {number} activePage
 * @return {Object}
 */
const createPrevItem = (activePage: number) => ({ active: false, type: 'prevItem', value: Math.max(1, activePage - 1) });

/**
 * @param {number} activePage
 * @return {function}
 */
const createPageFactory = (activePage: number) => (pageNumber: number) => ({ active: activePage === pageNumber, type: 'pageItem', value: pageNumber });

/**
 * @param {number} activePage
 * @param {number} totalPages
 * @return {Object}
 */
const createNextItem = (activePage: number, totalPages: number) => ({ active: false, type: 'nextItem', value: Math.min(activePage + 1, totalPages) });

/**
 * @param {number} totalPages
 * @return {Object}
 */
const createLastItem = (totalPages: number) => ({ active: false, type: 'lastItem', value: totalPages });
