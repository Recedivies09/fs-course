import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Recedivies blog",
    author: "Ahmadhi",
    url: "https://github.com/Recedivies",
    likes: 0,
  };

  const component = render(<Blog blog={blog} />);

  const span1 = component.container.querySelector(".title");
  const span2 = component.container.querySelector(".author");

  expect(span1).toBeVisible("Recedivies blog");
  expect(span2).toBeVisible("Ahmadhi");

  const div = component.container.querySelector(".url");
  const span3 = component.container.querySelector(".likes");

  expect(div).not.toBeVisible("https://github.com/Recedivies");
  expect(span3).not.toBeVisible("0");
});

test("blog's url and number of likes are shown when the button is clicked", () => {
  const blog = {
    title: "Recedivies blog",
    author: "Ahmadhi",
    url: "https://github.com/Recedivies",
    likes: 0,
  };
  const component = render(<Blog blog={blog} />);

  const button = component.getByText("view");
  fireEvent.click(button);

  const div = component.container.querySelector(".url");
  const span3 = component.container.querySelector(".likes");

  expect(div).toBeVisible("https://github.com/Recedivies");
  expect(span3).toBeVisible("0");
});

test("clicking the like button calls event handler twice", () => {
  const blog = {
    title: "Recedivies blog",
    author: "Ahmadhi",
    url: "https://github.com/Recedivies",
    likes: 0,
  };

  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} incLike={mockHandler} />);

  const button = component.getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
