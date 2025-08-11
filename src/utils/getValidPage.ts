function getValidPage(searchParams: URLSearchParams): number {
  const page = +(searchParams.get('page') || '');
  return isNaN(page) || page < 1 ? 1 : page;
}

export default getValidPage;
