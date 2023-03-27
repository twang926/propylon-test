import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { setupStore } from "./store/index";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders } from "./utils/test-utils";
import { fetchDocuments } from "./store/actions";
beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});
export const handlers = [
  rest.get("http://localhost:3004/data", (req, res, ctx) => {
    const doc = {
      id: "951a4781-92fb-48da-907c-c320f9886879",
      name: "Chapter 1",
      level: 1,
      parent_id: "",
      content: "This is the content for Chapter 1",
    };
    return res(ctx.json({ content: { document: [doc] } }), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("render Toc", async () => {
  const store = setupStore();
  renderWithProviders(<App />, { store });
  expect(await screen.findByText(/Chapter 1/i)).toBeInTheDocument();
});

test("render content", async () => {
  const store = setupStore();
  renderWithProviders(<App />, { store });
  expect(await screen.findByText(/Chapter 1/i)).toBeInTheDocument();

  const chapter1 = screen.getByText("Chapter 1");
  expect(chapter1).toBeInTheDocument();
  fireEvent.click(chapter1);
  expect(
    await screen.findByText(/This is the content for Chapter 1/i)
  ).toBeInTheDocument();
});
