import { SaharoseUiPage } from './app.po';

describe('saharose-ui App', () => {
  let page: SaharoseUiPage;

  beforeEach(() => {
    page = new SaharoseUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
