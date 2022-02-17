/* eslint-disable no-unused-vars */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;

  const blog = {
    id: "dew4",
    user: {
      id: "1bg43",
      username: "joker",
    },
    author: "Fred",
    title: "First blog",
    url: "",
    likes: 0,
  };

  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog blog={blog} username="joker" incrementLike={mockHandler} />
    );
  });

  test("renders content", () => {
    expect(component.container).toHaveTextContent("First blog by Fred");
  });

  test("at start the details are not displayed", () => {
    const ul = component.container.querySelector(".togglableContent");

    expect(ul).toHaveStyle("display: none");
  });

  test("blog's url and likes are shown after show button is clicked", () => {
    const ul = component.container.querySelector(".togglableContent");
    const button = component.getByText("show details");
    fireEvent.click(button);

    expect(ul).toHaveStyle("display: block");
  });

  test("like button is clicked twice", () => {
    const button = component.container.querySelector(".likeButton");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
