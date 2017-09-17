import { HttpTestPage } from './app.po';

describe('http-test App', () => {
  let page: HttpTestPage;

  beforeEach(() => {
    page = new HttpTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
