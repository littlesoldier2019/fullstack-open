import React from "react";

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Part = ({ props }) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  const content = parts.map((part) => <Part props={part} key={part.id} />);
  return <div>{content}</div>;
};

const Total = ({ parts }) => {
  const sum = parts.reduce((result, part) => {
    return result + part.exercises;
  }, 0);
  return (
    <div>
      <h3>Total of {sum} exercises</h3>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
