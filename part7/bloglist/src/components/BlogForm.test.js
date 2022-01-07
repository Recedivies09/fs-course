import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<NoteForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: { value: "Recedivies GitHub" },
  });
  fireEvent.change(author, {
    target: { value: "Ahmadhi" },
  });
  fireEvent.change(url, {
    target: { value: "https://github.com/Recedivies" },
  });

  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Recedivies GitHub");
  expect(createBlog.mock.calls[0][0].author).toBe("Ahmadhi");
  expect(createBlog.mock.calls[0][0].url).toBe("https://github.com/Recedivies");
});
