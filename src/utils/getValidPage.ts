function getValidPage(searchParams: URLSearchParams): number {
  const page = searchParams.get('page');
  return page && /^\d+$/.test(page) ? parseInt(page, 10) : 1;
}

export default getValidPage;
